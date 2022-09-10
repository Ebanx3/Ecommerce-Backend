import { Router } from "express";
import Handler from "express-async-handler";
import multer from "multer";
import { deleteImage, getImage, uploadImage } from "./images.DAO";

const router = Router();

router.post("/", Handler(uploadImage));
router.get("/:imageId", Handler(getImage));
router.delete("/:imageId", Handler(deleteImage));

export default router;
