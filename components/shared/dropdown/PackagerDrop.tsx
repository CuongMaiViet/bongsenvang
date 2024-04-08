import {
  createPackager,
  deletePackager,
  getAllPackagers,
} from "@/lib/actions/packager.actions";
import { DropdownProps, INewData, IOrganization } from "@/types";
import { useEffect, useState } from "react";
import BaseDrop from "./BaseDrop";

const PackagerDrop = ({ value, onChangeHandler }: DropdownProps) => {
  const [packagers, setPackagers] = useState<IOrganization[]>([]);
  const [newData, setNewData] = useState<INewData>({
    title: "",
  });

  const handleAddPackager = () => {
    createPackager({
      organizationTitle: newData.title.trim(),
      organizationShortTitle: newData.shortTitle?.trim() as string,
      organizationContacts: newData.contacts as any,
    }).then((data) => setPackagers((prevState) => [...prevState, data]));
  };

  const handleDeletePackager = (id: string) => {
    deletePackager(id).then((data) => setPackagers(data));
  };

  useEffect(() => {
    const getPackagers = async () => {
      const packagerList = await getAllPackagers();
      packagerList && setPackagers(packagerList as IOrganization[]);
    };

    getPackagers();
  }, []);

  return (
    <BaseDrop
      data={packagers}
      value={value}
      selectName="packager"
      onChangeHandler={onChangeHandler}
      handleAddFunction={handleAddPackager}
      handleDeleteByIdFuntion={handleDeletePackager}
      setNewData={setNewData}
    />
  );
};

export default PackagerDrop;
