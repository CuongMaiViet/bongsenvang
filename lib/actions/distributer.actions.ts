"use server";

import { CreateDistributerParams } from "@/types";
import { connectToDataBase } from "../database";
import Distributer from "../database/models/distributer.model";
import { handleError } from "../utils";

export const createDistributer = async ({
  distributerTitle,
  distributerShortTitle,
  distributerContacts,
}: CreateDistributerParams) => {
  try {
    await connectToDataBase();

    const newDistributer = await Distributer.create({
      title: distributerTitle,
      shortTitle: distributerShortTitle,
      contacts: distributerContacts,
    });

    return JSON.parse(JSON.stringify(newDistributer));
  } catch (error) {
    handleError(error);
  }
};

export const getAllDistributers = async () => {
  try {
    await connectToDataBase();

    const distributers = await Distributer.find();

    return JSON.parse(JSON.stringify(distributers));
  } catch (error) {
    handleError(error);
  }
};

export const deleteDistributer = async (distributerId: string) => {
  try {
    await connectToDataBase();

    await Distributer.findByIdAndDelete(distributerId);
    const distributer = await Distributer.find();

    return JSON.parse(JSON.stringify(distributer));
  } catch (error) {
    handleError(error);
  }
};
