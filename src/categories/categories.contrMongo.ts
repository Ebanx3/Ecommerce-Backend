import { CateogriesModel } from "./categories.model";
import categoriesDTO from "./categories.DTO";
import { errorLogger } from "../services/logs";

const getAllCategories = async () => {
  try {
    const categories = await CateogriesModel.find();
    return categories.map((cat) => categoriesDTO(cat));
  } catch (err: any) {
    errorLogger(err);
  }
};

const getCategoryById = async (id: string) => {
  try {
    const category = await CateogriesModel.findById(id);
    return categoriesDTO(category);
  } catch (err: any) {
    errorLogger(err);
    return "Category not found, invalid Id";
  }
};

const createCategory = async (name: string) => {
  try {
    if (!name) return "Name field is required";
    await CateogriesModel.create({ name });
    return name;
  } catch (err: any) {
    errorLogger(err);
  }
};

const updateCategory = async (id: string, name: string) => {
  try {
    const category = await CateogriesModel.findById(id);
    if (!name) return "Name field is required";
    await CateogriesModel.findByIdAndUpdate(id, { name }, { new: true });
    return "Category updated";
  } catch (err: any) {
    errorLogger(err);
    return "Category not found, invalid Id";
  }
};

const deleteCategory = async (id: string) => {
  try {
    const category = await CateogriesModel.findById(id);
    await CateogriesModel.findByIdAndDelete(id);
    return "Category deleted";
  } catch (err: any) {
    errorLogger(err);
    return "Category not found, invalid Id";
  }
};

const categoriesMongooseController = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoriesMongooseController;
