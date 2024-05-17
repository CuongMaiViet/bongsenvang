"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../../ui/input";
import { BaseProps } from "./BaseDrop";
import { Delimiter, translator as t } from "@/constants";
import AddNewAlert from "./alertdialog/AddNewAlert";
import DeleteAlert from "./alertdialog/DeleteAlert";
import { IDropdownShowData } from "@/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DoubleDrops<T> extends BaseProps {
  setDataFromChild: React.Dispatch<React.SetStateAction<T[]>>;
}

type DoubleBase = { ingredient?: string; amount?: string };

const initialValue = {
  ingredient: "",
  amount: "",
};

const DoubleInput = <T extends DoubleBase>({
  setDataFromChild,
  data,
  selectName,
  handleAddFunction,
  handleDeleteByIdFuntion,
  setNewData,
}: DoubleDrops<T>) => {
  const translateSelectName = t[selectName as keyof typeof t];

  const [ingredients, setIngredients] = useState<T[]>([]);
  const [newValue, setNewValue] = useState<T>(initialValue as T);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewValue((prevState) => ({ ...prevState, amount: e.target.value }));
  };

  const handleSelectChange = (e: string) => {
    setNewValue((prevState) => ({ ...prevState, ingredient: e }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Delimiter.Enter) {
      e.preventDefault();
      const modifiedNewValue = { ...newValue };
      // const modifiedNewValue = { ...newValue, amount: newValue?.amount + "%" };

      setIngredients((prevState) => [...prevState, modifiedNewValue]);
      setDataFromChild([...ingredients, modifiedNewValue]);
      setNewValue(initialValue as T);
    }
  };

  const findIngredientTitleByID = (
    data: IDropdownShowData[],
    id: string
  ): string => {
    return data.find((e) => e._id === id)?.title as string;
  };

  const onRemoveObj = (idToRemove: string) => {
    const newCores = ingredients.filter((c) => c.ingredient !== idToRemove);
    setIngredients(newCores);
    setDataFromChild(newCores);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Select
          name={selectName}
          value={newValue.ingredient}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="select-field capitalize">
            <SelectValue placeholder={`Vui lòng chọn ${translateSelectName}`} />
          </SelectTrigger>
          <SelectContent>
            {data.length > 0 &&
              data.map((e) => (
                <div className="flex-center gap-1" key={e._id}>
                  <SelectItem
                    value={e._id}
                    className={"select-item p-regular-14 capitalize"}
                  >
                    {e.title}
                  </SelectItem>

                  <DeleteAlert
                    data={e}
                    handleDeleteByIdFuntion={handleDeleteByIdFuntion}
                  />
                </div>
              ))}

            <AddNewAlert
              selectName={selectName}
              translateSelectName={translateSelectName}
              setNewData={setNewData}
              handleAddFunction={handleAddFunction}
            />
          </SelectContent>
        </Select>

        <Input
          type="string"
          name="amount"
          value={newValue.amount}
          step={0.1}
          placeholder="K.Lượng (%)"
          className="input-field w-[50%]"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <span className="flex gap-3">
        {ingredients.length > 0 &&
          ingredients.map((c) => (
            <div key={c.ingredient} className="tag-item">
              {`${findIngredientTitleByID(data, c.ingredient as string)} : ${
                c.amount
              }`}
              <Button
                type="button"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event from bubbling up to the tag span
                  onRemoveObj(c.ingredient as string);
                }}
                className="py-1 px-3 h-full hover:bg-transparent"
              >
                <X size={14} />
              </Button>
            </div>
          ))}
      </span>
    </div>
  );
};
export default DoubleInput;
