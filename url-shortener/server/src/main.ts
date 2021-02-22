import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import process from 'process';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import express from 'express';
import serveStatic from 'serve-static';

const LISTEN_PORT = 8080;
const STATIC_CONTENT_ROOT = '../../client/dist/client';
const STATIC_CONTENT_DIR = join(__dirname, STATIC_CONTENT_ROOT);

process.on('SIGINT', () => {
    console.log('SIGTERM Received..., Have a nice day :D !!');
    process.exit();
});

async function bootstrap() {
    console.log(`STATIC_CONTENT_DIR: ${STATIC_CONTENT_DIR}`);
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    // additional configuration to express app
    app.use(cookieParser())
        .use('/', express.static(STATIC_CONTENT_DIR))
        // .use(serveStatic(STATIC_CONTENT_DIR))
        .use(helmet()) // sets common security related http headers
        .enableCors({
            origin: '*',
        });

    // SJD should not use bind all in the case of loopback configuration
    await app.listen(LISTEN_PORT, '0.0.0.0', () => {
        console.log(`Server started listening on port: ${LISTEN_PORT}`);
        console.log(`Browser url: http://localhost:${LISTEN_PORT}`);
    });
}

bootstrap().catch((err) => console.error(err));
