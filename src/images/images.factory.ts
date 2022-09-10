import config from "../config";
import ControllerImagesMongo from "./images.controMongo";

export const imagesFactory = () => {
  switch (config.PERSISTENCE) {
    case "mongo": {
      return ControllerImagesMongo;
    }
  }
};
