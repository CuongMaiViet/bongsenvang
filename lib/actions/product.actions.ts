"use server";

import { connectToDataBase } from "../database";
import { handleError } from "../utils";
import { CreateProductParams, DeleteProductParams, GetAllProductsParams, GetRelatedProductsByCategoryParams, UpdateProductParams } from "@/types";
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
import { revalidatePath } from "next/cache";

const getCategoryByTitle = async (title: string) => {
  return Category.findOne({ title: new RegExp(title, 'i') })
}

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

export const getAllProducts = async ({ query, limit = 6, page, category }: GetAllProductsParams) => {
  try {
    await connectToDataBase();

    const titleCondition = query ? { title: new RegExp(query, 'i') } : {}
    const categoryCondition = category ? await getCategoryByTitle(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}]
    }

    const skipAmount = (Number(page) - 1) * limit
    const productsQuery = Product.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const products = await populateProduct(productsQuery)
    const productsCount = await Product.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(products)),
      totalPages: Math.ceil(productsCount / limit)
    }
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async ({ productId, path }: DeleteProductParams) => {
  try {
    await connectToDataBase();
    const deletedProduct = await Product.findByIdAndDelete(productId)

    if (deletedProduct) revalidatePath(path)

  } catch (error) {
    handleError(error)
  }
}

export const updateProduct = async ({
  product,
  userId,
  path,
}: UpdateProductParams) => {
  try {
    await connectToDataBase();

    const productToUpdate = await Product.findById(product._id)
    if (!productToUpdate || productToUpdate.createdBy.toHexString() !== userId) {
      throw new Error('Unauthorized or product not found')
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { ...product, category: product.category },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedProduct))
  } catch (error) {
    handleError(error)
  }
}

export async function getRelatedProductsByCategory({
  categoryId,
  productId,
  limit = 3,
  page = 1,
}: GetRelatedProductsByCategoryParams) {
  try {
    await connectToDataBase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: productId } }] }

    const productsQuery = Product.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateProduct(productsQuery)
    const productsCount = await Product.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(productsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}