"use server";

import { CreatePestParams } from "@/types";
import { handleError } from "../utils";
import { connectToDataBase } from "../database";
import Pest from "../database/models/pest.model";

export const createPest = async ({ pestTitle }: CreatePestParams) => {
  try {
    await connectToDataBase();

    const newPest = await Pest.create({
      title: pestTitle,
    });

    return JSON.parse(JSON.stringify(newPest));
  } catch (error) {
    handleError(error);
  }
};

export const getAllPests = async () => {
  try {
    await connectToDataBase();

    const pests = await Pest.find();

    return JSON.parse(JSON.stringify(pests));
  } catch (error) {
    handleError(error);
  }
};

export const getPestById = async (pestID: string) => {
  try {
    await connectToDataBase();

    const pest = await Pest.findById(pestID);

    return JSON.parse(JSON.stringify(pest));
  } catch (error) {
    handleError(error);
  }
};

export const deletePest = async (pestID: string) => {
  try {
    await connectToDataBase();

    await Pest.findByIdAndDelete(pestID);
    const pests = await Pest.find();

    return JSON.parse(JSON.stringify(pests));
  } catch (error) {
    handleError(error);
  }
};
