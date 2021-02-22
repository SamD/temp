import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import supertest from 'supertest';

let app: INestApplication;
beforeAll(async () => {
    console.log('beforeAll');
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
});

describe('UrlShortenerController (NEW)', () => {
    const controllerEP = '/s';
    const testShortenURL = 'https://google.com';
    let serverResponse;

    // Test get with invalid id returns 404
    it('/s/{invalidid} (GET)', () => {
        // return supertest(app.getHttpServer()).get('/').expect(404).expect('Hello World!');
        return supertest(app.getHttpServer()).get(controllerEP).expect(404);
    });

    // Test successful shorten
    it('/s/{new} (POST)', async () => {
        // return supertest(app.getHttpServer()).get('/').expect(404).expect('Hello World!');
        const res: supertest.Response = await supertest(app.getHttpServer())
            .post(controllerEP)
            .set('Accept', 'application/json')
            .send({
                url: testShortenURL,
            });
        expect(res.header['content-type']).toMatch(/json/);
        expect(res.status).toEqual(201);
        // store JSON response from shortened url creation
        serverResponse = res.body;
    });

    // nested test after new url has been created
    describe('UrlShortenerController (EXISTING)', () => {
        // valid get means cache hit and a 302
        it('/s/{validid} (GET) does redirect', async () => {
            // the shortened url created is stored in response body url field
            const validPath = new URL(serverResponse.url).pathname;
            const res: supertest.Response = await supertest(app.getHttpServer()).get(validPath);
            expect(res.status).toEqual(302);
            // since a redirect the target url is stored in location header should match our original url
            expect(res.header['location']).toEqual(testShortenURL);
        });

        // Requesting shortened url already shortened is idempotent
        it('/s/{existing} (POST)', async () => {
            // return supertest(app.getHttpServer()).get('/').expect(404).expect('Hello World!');
            const res: supertest.Response = await supertest(app.getHttpServer())
                .post(controllerEP)
                .set('Accept', 'application/json')
                .send({
                    url: testShortenURL,
                });
            expect(res.header['content-type']).toMatch(/json/);
            expect(res.status).toEqual(201);
            // expect the same shortened url value from the first creation
            expect(res.body.url).toEqual(serverResponse.url);
        });
    });
});
