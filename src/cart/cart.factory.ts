import config from "../config";
import ControllerMongoCart from "./cart.contMongo";

export const cartFactory = () => {
    switch(config.PERSISTENCE){
        case 'mongo':{
            return ControllerMongoCart;
        }
    }
}