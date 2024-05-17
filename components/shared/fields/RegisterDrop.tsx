import {
  createRegister,
  deleteRegister,
  getAllRegisters,
} from "@/lib/actions/register.actions";
import { DropdownProps, INewData, IOrganization } from "@/types";
import { useEffect, useState } from "react";
import BaseDrop from "./BaseDrop";
import { FieldName } from "@/constants";

const RegisterDrop = ({ value, onChangeHandler }: DropdownProps) => {
  const [registers, setRegisters] = useState<IOrganization[]>([]);
  const [newData, setNewData] = useState<INewData>({
    title: "",
  });

  const handleAddRegister = () => {
    createRegister({
      organizationTitle: newData.title.trim(),
      organizationShortTitle: newData.shortTitle?.trim() as string,
      organizationContacts: newData.contacts as any,
    }).then((data) => setRegisters((prevState) => [...prevState, data]));
  };

  const handleDeleteRegister = (id: string) => {
    deleteRegister(id).then((data) => setRegisters(data));
  };

  useEffect(() => {
    const getRegisters = async () => {
      const registerList = await getAllRegisters();
      registerList && setRegisters(registerList as IOrganization[]);
    };

    getRegisters();
  }, []);

  return (
    <BaseDrop
      data={registers}
      value={value}
      selectName={FieldName.Register}
      onChangeHandler={onChangeHandler}
      handleAddFunction={handleAddRegister}
      handleDeleteByIdFuntion={handleDeleteRegister}
      setNewData={setNewData}
    />
  );
};

export default RegisterDrop;
