"use server";

import { CreateIngredientParams } from "@/types";
import { handleError } from "../utils";
import { connectToDataBase } from "../database";
import Ingredient from "../database/models/ingredient.model";

export const createIngredient = async ({
  ingredientTitle,
  ingredientDesc,
}: CreateIngredientParams) => {
  try {
    await connectToDataBase();

    const newIngredient = await Ingredient.create({
      title: ingredientTitle,
      desc: ingredientDesc,
    });

    return JSON.parse(JSON.stringify(newIngredient));
  } catch (error) {
    handleError(error);
  }
};

export const getAllIngredients = async () => {
  try {
    await connectToDataBase();

    const ingredients = await Ingredient.find();

    return JSON.parse(JSON.stringify(ingredients));
  } catch (error) {
    handleError(error);
  }
};

export const getIngredientById = async (ingredientID: string) => {
  try {
    await connectToDataBase();

    const ingredient = await Ingredient.findById(ingredientID);

    return JSON.parse(JSON.stringify(ingredient));
  } catch (error) {
    handleError(error);
  }
};

export const deleteIngredient = async (ingredientID: string) => {
  try {
    await connectToDataBase();

    await Ingredient.findByIdAndDelete(ingredientID);
    const ingredients = await Ingredient.find();

    return JSON.parse(JSON.stringify(ingredients));
  } catch (error) {
    handleError(error);
  }
};
