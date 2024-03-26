"use server";

import { CreateFormulationParams } from "@/types";
import { handleError } from "../utils";
import { connectToDataBase } from "../database";
import Formulation from "../database/models/formulation.model";

export const createFormulation = async ({
  formulationTitle,
  formulationAbbre,
}: CreateFormulationParams) => {
  try {
    await connectToDataBase();

    const newFormulation = await Formulation.create({
      title: formulationTitle,
      abbreviation: formulationAbbre,
    });

    return JSON.parse(JSON.stringify(newFormulation));
  } catch (error) {
    handleError(error);
  }
};

export const getAllFormulations = async () => {
  try {
    await connectToDataBase();

    const formulations = await Formulation.find();

    return JSON.parse(JSON.stringify(formulations));
  } catch (error) {
    handleError(error);
  }
};

export const deleteFormulationById = async (formulationId: string) => {
  try {
    await connectToDataBase();

    await Formulation.findByIdAndDelete(formulationId);
    const formulations = await Formulation.find();

    return JSON.parse(JSON.stringify(formulations));
  } catch (error) {
    handleError(error);
  }
};
