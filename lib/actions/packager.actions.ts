"use server";

import { CreateOrganizationParams } from "@/types";
import { connectToDataBase } from "../database";
import Packager from "../database/models/packager.model";
import { handleError } from "../utils";

export const createPackager = async ({
  organizationTitle,
  organizationShortTitle,
  organizationContacts,
}: CreateOrganizationParams) => {
  try {
    await connectToDataBase();

    const newPackager = await Packager.create({
      title: organizationTitle,
      shortTitle: organizationShortTitle,
      contacts: organizationContacts,
    });

    return JSON.parse(JSON.stringify(newPackager));
  } catch (error) {
    handleError(error);
  }
};

export const getAllPackagers = async () => {
  try {
    await connectToDataBase();

    const packagers = await Packager.find();

    return JSON.parse(JSON.stringify(packagers));
  } catch (error) {
    handleError(error);
  }
};

export const deletePackager = async (organizationID: string) => {
  try {
    await connectToDataBase();

    await Packager.findByIdAndDelete(organizationID);
    const packager = await Packager.find();

    return JSON.parse(JSON.stringify(packager));
  } catch (error) {
    handleError(error);
  }
};
