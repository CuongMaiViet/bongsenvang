"use server";

import { CreateOrganizationParams } from "@/types";
import { connectToDataBase } from "../database";
import { handleError } from "../utils";
import Register from "../database/models/register.model";

export const createRegister = async ({
  organizationTitle,
  organizationShortTitle,
  organizationContacts,
}: CreateOrganizationParams) => {
  try {
    await connectToDataBase();

    const newRegister = await Register.create({
      title: organizationTitle,
      shortTitle: organizationShortTitle,
      contacts: organizationContacts,
    });

    return JSON.parse(JSON.stringify(newRegister));
  } catch (error) {
    handleError(error);
  }
};

export const getAllRegisters = async () => {
  try {
    await connectToDataBase();

    const registers = await Register.find();

    return JSON.parse(JSON.stringify(registers));
  } catch (error) {
    handleError(error);
  }
};

export const deleteRegister = async (organizationID: string) => {
  try {
    await connectToDataBase();

    await Register.findByIdAndDelete(organizationID);
    const register = await Register.find();

    return JSON.parse(JSON.stringify(register));
  } catch (error) {
    handleError(error);
  }
};
