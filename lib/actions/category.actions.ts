"use server";

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToDataBase } from "../database";
import Category from "../database/models/category.model";

export const createCategory = async ({
  categoryTitle,
}: CreateCategoryParams) => {
  try {
    await connectToDataBase();

    const newCategory = await Category.create({ title: categoryTitle });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDataBase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await connectToDataBase();

    await Category.findByIdAndDelete(categoryId);
    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
