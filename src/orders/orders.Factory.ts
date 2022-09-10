import config from "../config";
import ordersMongoController from "./order.contrMongo";

export const ordersFactory = () => {
  switch (config.PERSISTENCE) {
    case "mongo": {
      return ordersMongoController;
    }
  }
};
