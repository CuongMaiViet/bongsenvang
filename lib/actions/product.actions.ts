"use server";

import { connectToDataBase } from "../database";
import { handleError } from "../utils";
import { CreateProductParams } from "@/types";
import Manufacturer from "../database/models/manufacturer.model";
import Product from "../database/models/product.model";
import Category from "../database/models/category.model";
import Register from "../database/models/register.model";
import Packager from "../database/models/packager.model";
import Distributer from "../database/models/distributer.model";
import Formulation from "../database/models/formulation.model";
import Ingredient from "../database/models/ingredient.model";
import User from "../database/models/user.model";
import Crop from "../database/models/crop.model";
import Pest from "../database/models/pest.model";

const populateProduct = async (query: any) => {
  return query
    .populate({
      path: "category",
      model: Category,
      select: "_id title",
    })
    .populate({
      path: "formulation",
      model: Formulation,
      select: "_id title abbreviation",
    })
    .populate({
      path: "ingredients",
      model: Ingredient,
      populate: {
        path: "ingredient",
        select: "title",
      },
    })
    .populate({
      path: "manual.useAmount",
      model: Crop,
      populate: {
        path: "crop",
        select: "title",
      },
    })
    .populate({
      path: "manual.useAmount",
      model: Pest,
      populate: {
        path: "pest",
        select: "title",
      },
    })
    .populate({
      path: "manufacturer",
      model: Manufacturer,
      select: "_id title shortTitle",
    })
    .populate({
      path: "register",
      model: Register,
      select: "_id title shortTitle",
    })
    .populate({
      path: "packager",
      model: Packager,
      select: "_id title shortTitle",
    })
    .populate({
      path: "distributer",
      model: Distributer,
      select: "_id title shortTitle",
    })
    .populate({
      path: "createdBy",
      model: User,
      select: "_id firstName lastName",
    });
};

export const createProduct = async ({
  product,
  userId,
  path,
}: CreateProductParams) => {
  try {
    await connectToDataBase();

    const userWhoCreateThisProduct = await User.findById(userId);
    if (!userWhoCreateThisProduct) throw new Error("User not found");

    const newProduct = await Product.create({ ...product, createdBy: userId });

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    handleError(error);
  }
};

export const getProductById = async (productId: string) => {
  try {
    await connectToDataBase();
    const product = await populateProduct(Product.findById(productId));

    if (!product) {
      throw new Error("Product not found");
    }

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
  }
};
