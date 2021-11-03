import {NestFactory} from "@nestjs/core";
import {SeederService} from "./seeder.service";
import {AppModule} from "./app.module";

async function bootstrap() {
    const appContext = await NestFactory.createApplicationContext(AppModule);
    try {
        const seeder = appContext.get(SeederService);
        await seeder.seed();
        console.debug('Seeding complete!');
        await appContext.close();
    } catch (e) {
        console.log('Seeding failed: ', e);
        await appContext.close();
    }
}
bootstrap();