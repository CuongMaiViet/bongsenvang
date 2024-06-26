"use server";

import { CreateOrganizationParams } from "@/types";
import { connectToDataBase } from "../database";
import Distributer from "../database/models/distributer.model";
import { handleError } from "../utils";

export const createDistributer = async ({
  organizationTitle,
  organizationShortTitle,
  organizationContacts,
}: CreateOrganizationParams) => {
  try {
    await connectToDataBase();

    const newDistributer = await Distributer.create({
      title: organizationTitle,
      shortTitle: organizationShortTitle,
      contacts: organizationContacts,
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

export const deleteDistributer = async (organizationID: string) => {
  try {
    await connectToDataBase();

    await Distributer.findByIdAndDelete(organizationID);
    const distributer = await Distributer.find();

    return JSON.parse(JSON.stringify(distributer));
  } catch (error) {
    handleError(error);
  }
};
