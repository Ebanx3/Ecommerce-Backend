import config from "../config";
import categoriesMongooseController from "./categories.contrMongo";
import categoriesMemoryController from "./categories.contrMemory";

export const categoriesFactory = () => {
    switch(config.PERSISTENCE){
        case 'mongo':{
            return categoriesMongooseController;
        }
        case 'memory':{
            return categoriesMemoryController;
        }
        default:{
            return categoriesMemoryController;
        }
    }
}