import {
  createDistributer,
  deleteDistributer,
  getAllDistributers,
} from "@/lib/actions/distributer.actions";
import { IDistributer } from "@/lib/database/models/distributer.model";
import { DropdownProps, INewData } from "@/types";
import { useEffect, useState } from "react";
import BaseDrop from "./BaseDrop";

const DistributerDrop = ({ value, onChangeHandler }: DropdownProps) => {
  const [distributers, setDistributers] = useState<IDistributer[]>([]);
  const [newData, setNewData] = useState<INewData>({
    title: "",
  });

  const handleAddDistributer = () => {
    createDistributer({
      distributerTitle: newData.title.trim(),
      distributerShortTitle: newData.shortTitle?.trim() as string,
      distributerContacts: newData.contacts as any,
    }).then((data) => setDistributers((prevState) => [...prevState, data]));
  };

  const handleDeleteDistributer = (id: string) => {
    deleteDistributer(id).then((data) => setDistributers(data));
  };

  useEffect(() => {
    const getDistributers = async () => {
      const distributerList = await getAllDistributers();
      distributerList && setDistributers(distributerList as IDistributer[]);
    };

    getDistributers();
  }, []);

  return (
    <BaseDrop
      data={distributers}
      value={value}
      selectName="distributer"
      onChangeHandler={onChangeHandler}
      handleAddFunction={handleAddDistributer}
      handleDeleteByIdFuntion={handleDeleteDistributer}
      setNewData={setNewData}
    />
  );
};

export default DistributerDrop;
