import {
  createManufacturer,
  deleteManufacturer,
  getAllManufacturers,
} from "@/lib/actions/manufacturer.actions";
import { DropdownProps, INewData, IOrganization } from "@/types";
import { useEffect, useState } from "react";
import BaseDrop from "./BaseDrop";
import { FieldName } from "@/constants";

const ManufacturerDrop = ({ value, onChangeHandler }: DropdownProps) => {
  const [manufacturers, setManufacturers] = useState<IOrganization[]>([]);
  const [newData, setNewData] = useState<INewData>({
    title: "",
  });

  const handleAddManufacturer = () => {
    createManufacturer({
      organizationTitle: newData.title.trim(),
      organizationShortTitle: newData.shortTitle?.trim() as string,
      organizationContacts: newData.contacts as any,
    }).then((data) => setManufacturers((prevState) => [...prevState, data]));
  };

  const handleDeleteManufacturer = (id: string) => {
    deleteManufacturer(id).then((data) => setManufacturers(data));
  };

  useEffect(() => {
    const getManufacturers = async () => {
      const manufacturerList = await getAllManufacturers();
      manufacturerList && setManufacturers(manufacturerList as IOrganization[]);
    };

    getManufacturers();
  }, []);

  return (
    <BaseDrop
      data={manufacturers}
      value={value}
      selectName={FieldName.Manufacturer}
      onChangeHandler={onChangeHandler}
      handleAddFunction={handleAddManufacturer}
      handleDeleteByIdFuntion={handleDeleteManufacturer}
      setNewData={setNewData}
    />
  );
};

export default ManufacturerDrop;
