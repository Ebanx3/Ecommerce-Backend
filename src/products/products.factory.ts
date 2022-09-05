import config from "../config";
import productsMongoController from "./products.contrMongo";
// import categoriesMemoryController from "./categories.contrMemory";

export const productsFactory = () => {
    switch(config.PERSISTENCE){
        case 'mongo':{
            return productsMongoController;
        }
    //     case 'memory':{
    //         return categoriesMemoryController;
    //     }
    //     default:{
    //         return categoriesMemoryController;
        //  }
    }
}