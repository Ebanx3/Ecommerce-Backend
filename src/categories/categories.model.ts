import { Schema, model } from "mongoose";

export const categoryCollectionName = 'category';

const categoriesSchema = new Schema({
    name: { type:String, required: true },
},{
    versionKey: false
});

export const CateogriesModel = model(categoryCollectionName, categoriesSchema);