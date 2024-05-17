import {
  createIngredient,
  deleteIngredient,
  getAllIngredients,
} from "@/lib/actions/ingredient.actions";
import { IIngredient } from "@/lib/database/models/ingredient.model";
import { INewData } from "@/types";
import { forwardRef, useEffect, useState } from "react";
import DoubleInput from "./DoubleInput";
import { FieldName } from "@/constants";

export type Ingredient = {
  ingredient: string;
  amount: string;
};

export interface IngredientProps<T> {
  setDataFromChild: React.Dispatch<React.SetStateAction<T[]>>;
}

const IngredientDrop = forwardRef<
  HTMLInputElement,
  IngredientProps<Ingredient>
>((props, ref) => {
  const { setDataFromChild } = props;
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [newData, setNewData] = useState<INewData>({
    title: "",
  });

  const handleAddIngredient = () => {
    createIngredient({
      ingredientTitle: newData.title.trim(),
      ingredientDesc: newData.desc?.trim() as string,
    }).then((data) => setIngredients((prevState) => [...prevState, data]));
  };

  const handleDeleteIngredient = (id: string) => {
    deleteIngredient(id).then((data) => setIngredients(data));
  };

  useEffect(() => {
    const getIngredients = async () => {
      const ingredientList = await getAllIngredients();
      ingredientList && setIngredients(ingredientList as IIngredient[]);
    };

    getIngredients();
  }, []);

  return (
    <DoubleInput<Ingredient>
      data={ingredients}
      selectName={FieldName.Ingre}
      handleAddFunction={handleAddIngredient}
      handleDeleteByIdFuntion={handleDeleteIngredient}
      setNewData={setNewData}
      setDataFromChild={setDataFromChild}
    />
  );
});

export default IngredientDrop;
