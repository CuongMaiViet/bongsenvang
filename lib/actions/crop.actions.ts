"use server";

import { CreateCropParams } from "@/types";
import { handleError } from "../utils";
import { connectToDataBase } from "../database";
import Crop from "../database/models/crop.model";

export const createCrop = async ({ cropTitle }: CreateCropParams) => {
  try {
    await connectToDataBase();

    const newCrop = await Crop.create({
      title: cropTitle,
    });

    return JSON.parse(JSON.stringify(newCrop));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCrops = async () => {
  try {
    await connectToDataBase();

    const crops = await Crop.find();

    return JSON.parse(JSON.stringify(crops));
  } catch (error) {
    handleError(error);
  }
};

export const getCropById = async (cropID: string) => {
  try {
    await connectToDataBase();

    const crop = await Crop.findById(cropID);

    return JSON.parse(JSON.stringify(crop));
  } catch (error) {
    handleError(error);
  }
};

export const deleteCrop = async (cropID: string) => {
  try {
    await connectToDataBase();

    await Crop.findByIdAndDelete(cropID);
    const crops = await Crop.find();

    return JSON.parse(JSON.stringify(crops));
  } catch (error) {
    handleError(error);
  }
};
