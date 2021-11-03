import cheerio from 'cheerio';
import axios from 'axios';
import {ProtectiveFactor, RiskFactor, ScreeningMethod, Treatment} from "../interfaces";
import {CreateCancerTypeDto} from "../dto/create-cancer-type.dto";

export const rootURL = 'https://www.cancer.gov';

interface CancerData {
    overview: {
        name: string;
        overview: string;
        copingData: string[];
    }[];
    treatmentData: {
        name: string;
        treatments: string[];
    }[];
    preventionData: {
        name: string;
        factors: {
            riskFactors: string[];
            protectiveFactors: string[];
        }
    }[];
    screeningData: {
        name: string;
        screeningData: string[];
    }[];
}

async function getCancerTreatments(path: string) {
    const html = (await axios.get(`${rootURL}${path}`)).data as string;
    const $ = cheerio.load(html);
    const section = $('h3:contains("treatment are used:")').next().parent();
    const treatments = $(section).children("section").children('h4');
    const treatmentList: string[] = [];
    for (let i = 0; i < treatments.length; i++) {
        treatmentList.push($(treatments[i]).text().trim());
    }
    return treatmentList;
}

async function getCancerCausesAndPreventions(path: string) {
    const html = (await axios.get(`${rootURL}${path}`)).data as string;
    const $ = cheerio.load(html);
    const section = $('h2:contains("Cancer Prevention")').next().parent();
    const keyPoints = $(section)
        .children("div.pdq-sections")
        .children('div.key-points')
        .children('div')
        .children('ul')
        .children('li')

    const riskFactors: string[] = [];
    const protectiveFactors: string[] = [];
    for (let i = 0; i < keyPoints.length; i++) {
        const children = $(keyPoints[i]).children('ul').children('li');
        const isRiskFactor = $(keyPoints[i]).text().toLowerCase().search('risk factor') !== -1;
        const isProtectiveFactor = $(keyPoints[i]).text().toLowerCase().search('protective factor') !== -1;
        if (isRiskFactor && !isProtectiveFactor) {
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    const riskFactor = $(children[i]).text()
                    riskFactors.push(riskFactor.trim().toLowerCase());
                }
            } else {
                const riskFactor = $(keyPoints[i]).text()
                riskFactors.push(riskFactor.trim().toLowerCase());
            }
        } else if (!isRiskFactor && isProtectiveFactor) {
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    const protectiveFactor = $(children[i]).text()
                    protectiveFactors.push(protectiveFactor.trim().toLowerCase());
                }
            } else {
                const protectiveFactor = $(keyPoints[i]).text()
                protectiveFactors.push(protectiveFactor.trim().toLowerCase());
            }
        }
    }

    return {riskFactors, protectiveFactors}
}

async function getCancerScreeningMethods(path: string) {
    const html = (await axios.get(`${rootURL}${path}`)).data as string;
    const $ = cheerio.load(html);
    const section = $('h2:contains("Cancer Screening")').first().next().parent();
    const keyPoints = $(section)
        .children("div.pdq-sections")
        .children('div.key-points')
        .children('div')
        .children('ul')
        .children('li')

    const screeningMethods: string[] = [];
    for (let i = 0; i < keyPoints.length; i++) {
        const children = $(keyPoints[i]).children('ul').children('li');
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                const method = $(children[i]).text()
                screeningMethods.push(method.trim().toLowerCase());
            }
        } else {
            const method = $(keyPoints[i]).text()
            screeningMethods.push(method.trim().toLowerCase());
        }
    }

    return screeningMethods
}

async function getCopingWithCancerMethods() {
    const html = (await axios.get('https://www.cancer.gov/about-cancer/coping/feelings')).data as string;
    const $ = cheerio.load(html);
    const copingMethods = $('#other').children('h3');
    const methods: string[] = [];
    for (let i = 0; i < copingMethods.length; i++) {
        const method = $(copingMethods[i]).text();
        methods.push(method.trim().toLowerCase());
    }
    return methods;
}


export async function getCancerTypeData(path: string): Promise<CancerData> {
    const cancerData = {
        overview: [],
        treatmentData: [],
        preventionData: [],
        screeningData: []
    }
    const html = (await axios.get(`${rootURL}${path}`)).data as string;
    const $ = cheerio.load(html);
    const cancerTypeHeader = $('h1').first().text().toLowerCase();
    const overview = $('div.cardBody', 'div.equalheight.bgWhite.cthp-overview').text();
    if (overview) {
        const name = cancerTypeHeader.toString().split('-')[0];
        const copingData = await getCopingWithCancerMethods();
        cancerData['overview'].push({name, overview: overview.trim(), copingData});
        const treatmentList = $('div.cardBody', 'div.equalheight.bgWhite.cthp-treatment')
            .children('ul')
            .children('li');
        for (let i = 0; i < treatmentList.length; i++) {
            const href = $('a', treatmentList[i]).attr('href');
            const name = $('a', treatmentList[i]).text().replace('Treatment', '').trim().toLowerCase();
            const treatmentData = await getCancerTreatments(href);
            cancerData['treatmentData'].push({name, treatmentData});
        }
        const prevention = $('h4.cthp-pdq-label', 'div.equalheight.bgWhite.cthp-causes');
        if ($(prevention).text()) {
            const preventionList = $(prevention).next('ul');
            for (let i = 0; i < preventionList.length; i++) {
                const href = $('a', preventionList[i]).attr('href');
                const name = $('a', preventionList[i]).text().replace('Prevention', '').trim().toLowerCase();
                const preventionData = await getCancerCausesAndPreventions(href);
                cancerData['preventionData'].push({name, preventionData});
            }
        }
        const screening = $('h4.cthp-pdq-label', 'div.equalheight.bgWhite.cthp-screening');
        if ($(screening).text()) {
            const screeningList = $(screening).next('ul');
            for (let i = 0; i < screeningList.length; i++) {
                const href = $('a', screeningList[i]).attr('href');
                const name = $('a', screeningList[i]).text().replace('Screening', '').trim().toLowerCase();
                const screeningData = await getCancerScreeningMethods(href);
                cancerData['screeningData'].push({name, screeningData});
            }
        }
    }
    return cancerData;
}

export async function seedDB() {
    console.log('hello')
    const html = (await axios.get(`${rootURL}/types`)).data as string;
    const $ = cheerio.load(html);
    const types = $('li', 'ul.cancer-list')
    const cancerList: { [key: string]: boolean } = {};
    const docs: { [key: string]: CreateCancerTypeDto } = {};
    for (let i = 0; i < types.length; i++) {
        const href = $('a', types[i]).attr('href');
        if (!cancerList[href]) {
            let processing = true;
            const data = await getCancerTypeData(href);
            console.log('DATA: ', data)
            while (processing) {
                const overviewCount = data && data.overview ? data.overview.length : 0;
                const treatmentCount = data && data.treatmentData ? data.treatmentData.length : 0;
                const preventionCount = data && data.preventionData ? data.preventionData.length : 0;
                const screeningCount = data && data.screeningData ? data.screeningData.length : 0;
                const dataSize = overviewCount + treatmentCount + preventionCount + screeningCount;
                console.log(dataSize)
                if (overviewCount !== 0 && data.overview[overviewCount-1].name) {
                    docs[data.overview[overviewCount-1].name] = {
                        ...docs[data.overview[overviewCount-1].name],
                        name: data.overview[overviewCount-1].name,
                        overview: data.overview[overviewCount-1].overview
                    }
                    data.overview.pop();
                }
                if (treatmentCount !== 0 && data.treatmentData[treatmentCount-1].name) {
                    const treatments: Treatment[] = []
                    for (const index in data.treatmentData[treatmentCount - 1].treatments) {
                        treatments.push({method: data.treatmentData[treatmentCount - 1].treatments[index]});
                    }
                    docs[data.treatmentData[treatmentCount-1].name] = {
                        ...docs[data.treatmentData[treatmentCount-1].name],
                        name: data.treatmentData[treatmentCount-1].name,
                        treatments
                    }
                    data.treatmentData.pop();
                }
                if (preventionCount !== 0 && data.preventionData[preventionCount-1] && data.preventionData[preventionCount-1].name) {
                    const protectiveFactorsDocs: ProtectiveFactor[] = [];
                    const riskFactorsDocs: RiskFactor[] = [];
                    const riskFactors = data.preventionData[preventionCount - 1].factors && data.preventionData[preventionCount - 1].factors.riskFactors ? data.preventionData[preventionCount - 1].factors.riskFactors  : [];
                    const protectiveFactors = data.preventionData[preventionCount - 1].factors && data.preventionData[preventionCount - 1].factors.protectiveFactors ? data.preventionData[preventionCount - 1].factors.protectiveFactors : [];
                    for (const index in riskFactors) {
                        riskFactorsDocs.push({factor: riskFactors[index]});
                        for (const index in protectiveFactors) {
                            protectiveFactorsDocs.push({factor: data.preventionData[preventionCount - 1].factors.protectiveFactors[index]});
                        }
                    }
                    docs[data.preventionData[preventionCount-1].name] = {
                        ...docs[data.preventionData[preventionCount-1].name],
                        name: data.preventionData[preventionCount-1].name,
                        protectiveFactors: protectiveFactorsDocs,
                        riskFactors: riskFactorsDocs
                    }
                    data.preventionData.pop();
                }
                if (screeningCount !== 0 && data.screeningData[treatmentCount-1] && data.screeningData[treatmentCount-1].name) {
                    const screening: ScreeningMethod[] = [];
                    for (const index in data.screeningData[screeningCount-1].screeningData) {
                        screening.push({method: data.screeningData[screeningCount - 1].screeningData[index]});
                    }
                    docs[data.screeningData[treatmentCount-1].name] = {
                        ...docs[data.screeningData[treatmentCount-1].name],
                        name: data.screeningData[treatmentCount-1].name,
                        screeningMethods: screening
                    }
                    data.screeningData.pop();
                }

                if (dataSize === 0) processing = false;
            }
            cancerList[href] = true;
        }
    }
    console.log("DOCS", docs);
}