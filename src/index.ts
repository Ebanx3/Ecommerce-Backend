import { ConnectToDDBB } from "./services/ddbb";
import { initServer } from "./services/server";
import config from './config';

ConnectToDDBB(config.URL_MONGOATLAS!);
const port : number = config.PORT ? parseInt(config.PORT) : 8081;
initServer(port);
console.log('Connected to ddbb and server Up!, Listening at port',port)