import * as dotenv from 'dotenv';
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./router"
import { Company } from "./entity/Company";
import { Service } from "./entity/Service";

dotenv.config()

class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.router();
        this.connectDb()
    }

    public configuration() {
        this.app.use(bodyParser.json());
    }

    public router() {
        this.app.use('/', router)
    }

    public connectDb() {
        (async () => {
            await createConnection({
                type: "postgres",
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [
                    Company,
                    Service,
                ],
                synchronize: true,
                logging: false
            });
        })()
    }

    public start () {
        this.app.listen(8080, () => {
            console.log(`Server is running....`)
        });
    }
}

const server = new App();
server.start();
