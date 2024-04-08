"use server";

import { CreateOrganizationParams } from "@/types";
import { connectToDataBase } from "../database";
import { handleError } from "../utils";
import Manufacturer from "../database/models/manufacturer.model";

export const createManufacturer = async ({
  organizationTitle,
  organizationShortTitle,
  organizationContacts,
}: CreateOrganizationParams) => {
  try {
    await connectToDataBase();

    const newManufacturer = await Manufacturer.create({
      title: organizationTitle,
      shortTitle: organizationShortTitle,
      contacts: organizationContacts,
    });

    return JSON.parse(JSON.stringify(newManufacturer));
  } catch (error) {
    handleError(error);
  }
};

export const getAllManufacturers = async () => {
  try {
    await connectToDataBase();

    const manufacturers = await Manufacturer.find();

    return JSON.parse(JSON.stringify(manufacturers));
  } catch (error) {
    handleError(error);
  }
};

export const deleteManufacturer = async (organizationID: string) => {
  try {
    await connectToDataBase();

    await Manufacturer.findByIdAndDelete(organizationID);
    const manufacturer = await Manufacturer.find();

    return JSON.parse(JSON.stringify(manufacturer));
  } catch (error) {
    handleError(error);
  }
};
