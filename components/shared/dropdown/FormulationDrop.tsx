import { IFormulation } from "@/lib/database/models/formulation.model";
import { DropdownProps, INewData } from "@/types";
import { useEffect, useState } from "react";
import BaseDrop from "./BaseDrop";
import {
  createFormulation,
  deleteFormulationById,
  getAllFormulations,
} from "@/lib/actions/formulation.actions";

const FormulationDrop = ({ value, onChangeHandler }: DropdownProps) => {
  const [formulations, setFormulations] = useState<IFormulation[]>([]);
  const [newData, setNewData] = useState<INewData>({
    title: "",
  });

  const handleAddFormulation = () => {
    createFormulation({
      formulationTitle: newData.title.trim(),
      formulationAbbre: newData.abbreviation?.trim() as string,
    }).then((data) => setFormulations((prevState) => [...prevState, data]));
  };

  const handleDeleteFormulation = (id: string) => {
    deleteFormulationById(id).then((data) => setFormulations(data));
  };

  useEffect(() => {
    const getFormulations = async () => {
      const formulationList = await getAllFormulations();
      formulationList && setFormulations(formulationList as IFormulation[]);
    };

    getFormulations();
  }, []);

  return (
    <BaseDrop
      data={formulations}
      value={value}
      selectName="formulation"
      onChangeHandler={onChangeHandler}
      handleAddFunction={handleAddFormulation}
      handleDeleteByIdFuntion={handleDeleteFormulation}
      setNewData={setNewData}
    />
  );
};

export default FormulationDrop;
