import { GridFsStorage } from "multer-gridfs-storage";
import config from "../config";
import multer from "multer";

const storage = new GridFsStorage({
  url: config.URL_MONGOATLAS || "mongodb/localhost/images",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image.jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-productImage-${file.originalname}}`;
      return filename;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-productImage-${file.originalname}}`,
    };
  },
});

export default multer({ storage });
