import { errorLogger } from '../services/logs';
import { v4 as uuidv4 } from 'uuid';

interface Category {
    id: string,
    name: string,
}

const categoriesInMemory: Category[] = [];

const getAllCategories = async () => {
    try {
        return categoriesInMemory;
    }
    catch (err: any) {
        errorLogger(err)
    }
}

const getCategoryById = async (id: string) => {
    try {
        const index = categoriesInMemory.findIndex(a => a.id == id)
        if (index < 0) return 'Category not found, invalid Id';
        return categoriesInMemory[index];
    }
    catch (err: any) {
        errorLogger(err)
    }
}

const createCategory = async (name: string) => {
    try {
        if (!name) return 'Name field is required';
        const newCategory = {
            name,
            id: uuidv4(),
        };
        categoriesInMemory.push(newCategory);
        return name;
    }
    catch (err: any) {
        errorLogger(err)
    }
}

const updateCategory = async (id: string, name: string) => {
    try {
        const index = categoriesInMemory.findIndex(a => a.id == id)
        if (index < 0) return 'Category not found, invalid Id';
        if (!name) return 'Name field is required';
        categoriesInMemory[index].name = name;
        return 'Category updated';
    }
    catch (err: any) {
        errorLogger(err)
    }
}

const deleteCategory = async (id: string) => {
    try {
        const index = categoriesInMemory.findIndex(a => a.id == id)
        if (index < 0) return 'Category not found, invalid Id';
        categoriesInMemory.splice(index, 1);
        return 'Category deleted';
    }
    catch (err: any) {
        errorLogger(err)
    }
}

const categoriesMemoryController = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}

export default categoriesMemoryController;