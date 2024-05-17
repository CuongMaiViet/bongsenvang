import {
  createDistributer,
  deleteDistributer,
  getAllDistributers,
} from "@/lib/actions/distributer.actions";
import { DropdownProps, INewData, IOrganization } from "@/types";
import { useEffect, useState } from "react";
import BaseDrop from "./BaseDrop";
import { FieldName } from "@/constants";

const DistributerDrop = ({ value, onChangeHandler }: DropdownProps) => {
  const [distributers, setDistributers] = useState<IOrganization[]>([]);
  const [newData, setNewData] = useState<INewData>({
    title: "",
  });

  const handleAddDistributer = () => {
    createDistributer({
      organizationTitle: newData.title.trim(),
      organizationShortTitle: newData.shortTitle?.trim() as string,
      organizationContacts: newData.contacts as any,
    }).then((data) => setDistributers((prevState) => [...prevState, data]));
  };

  const handleDeleteDistributer = (id: string) => {
    deleteDistributer(id).then((data) => setDistributers(data));
  };

  useEffect(() => {
    const getDistributers = async () => {
      const distributerList = await getAllDistributers();
      distributerList && setDistributers(distributerList as IOrganization[]);
    };

    getDistributers();
  }, []);

  return (
    <BaseDrop
      data={distributers}
      value={value}
      selectName={FieldName.Distributer}
      onChangeHandler={onChangeHandler}
      handleAddFunction={handleAddDistributer}
      handleDeleteByIdFuntion={handleDeleteDistributer}
      setNewData={setNewData}
    />
  );
};

export default DistributerDrop;
