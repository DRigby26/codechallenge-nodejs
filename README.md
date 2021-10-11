# Code Challenge: Node.js
__Back-end and API Development Skills Assessment__

## Summary
This Node.js code challenge provides each candidate a `consistent` and `fair` opportunity to demonstrate the skills they have developed and practiced over their years of software engineering.

Additionally, the challenge allows each candidate the ability to go `above and beyond` to make sure the development manager and team can see their `unique combination` of `skills and abilities` and better understand why they should be the newest member of our amazing team.

The challenge is designed to test the `development skills`, `processes & procedures`, `git workflow`, `methods`, and `problem solving` used on a daily basis during software engineering. It is anticipated that the majority of candidates will `NOT` complete the entirety of this code challenge. 

The extent of the requirements are simply there to provide candidates with options to move forward in the challenge if they become stuck on any one requirement. This also allows the same test to be used to assess developers with skill levels from entry to senior to architect.

Simply do your best to complete as many of the requirements as possible within the time allotted. Please document in your code when you get stuck, your thoughts as to why you became stuck, and what you tried to become unstuck before moving on to another requirement. This documentation can go a long way in helping the team understand why you did not complete a requirement, where we can help you develop as a professional, and your problem-solving methodology. Don't let this challenge stress you out, we simply want to see what you can do and just as important how you do it!

## Project Description
For this challenge, you will build a web API that delivers cancer related information to third-party applications. They key to this API is to build it following [RESTful principles](https://www.redhat.com/en/topics/api/what-is-a-rest-api).

The data to be used can be found on the Government's [cancer website](https://www.cancer.gov/) and is located under the `CANCER TYPES` section of the website. How you extract the data from the website and convert it into a format that can be used by your new API is up to you.

Your API should supply information for several cancer types. The data set for each cancer must contain the following:

- Overview
- Treatments
- Causes and Preventions
- Screening Methods
- Coping with Cancer

## Instructions

### API Setup
We will keep this quite simple.

- [ ] Fork this repository to your own GitHub account 
- [ ] Setup and initialize a new [Nest.js](https://nestjs.com/) application within the newly cloned repository

_Note:_ You will be required to provide the repo URL to your fork of the code challenge. It is expected to be under your personal GitHub.com account. please make sure the repo is publicly accessible. Keep in mind, we want to see how you develop, this includes how you use Git in your development process.

Verify that the new Nest.js project:

- [ ] Builds
- [ ] Runs 

## Requirements
_Where the fun really beings_

### Features
- [ ] List all of the cancer types available
- [ ] Pull overview/summary information on a specific cancer type
- [ ] Pull treatments for a specific cancer type
- [ ] Pull causes and preventions for a specific cancer type
- [ ] Pull screening methods for a specific cancer type
- [ ] Pull coping methods for a specific cancer type
- [ ] Create a new cancer type
- [ ] Create a new treatment and assign it to a cancer type
- [ ] Create a new cause and assign it to a cancer type
- [ ] Create a new prevention and assign it to a cancer type
- [ ] Create a new screening method and assign it to a cancer type
- [ ] Create a new coping method and assign it to a cancer type
- [ ] Update a cancer type
- [ ] Update a treatment
- [ ] Update a cause
- [ ] Update a prevention
- [ ] Update a screening method
- [ ] Update a coping method
- [ ] Soft-Delete a cancer type
- [ ] Soft-Delete a treatment
- [ ] Soft-Delete a cause
- [ ] Soft-Delete a prevention
- [ ] Soft-Delete a screening method
- [ ] Soft-Delete a coping method
- [ ] Gracefully handle requests for cancer types that are not available
- [ ] Handle common errors associated with I/O (i.e. failed database connections, failed file system reads, error responses, failed API calls, etc.)
- [ ] Add paging to each GET endpoint
- [ ] System-level authentication (only known systems can communicate with the API)
- [ ] Enable CORS wildcard
- [ ] Protect against DoS attacks, rate-limit known systems
- [ ] System-level authorization (only authorized systems can modify data)

### Testing
- [ ] Each endpoint has a unit test
- [ ] Each endpoint has a postman test