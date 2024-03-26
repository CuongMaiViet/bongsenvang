import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { DropdownProps, INewData } from "@/types";
import { useEffect, useState } from "react";
import BaseDrop from "./BaseDrop";

const CategoryDrop = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newData, setNewData] = useState<INewData>({
    title: "",
  });

  const handleAddCategory = () => {
    createCategory({
      categoryTitle: newData.title.trim(),
    }).then((data) => setCategories((prevState) => [...prevState, data]));
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id).then((data) => setCategories(data));
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  return (
    <BaseDrop
      data={categories}
      value={value}
      selectName="category"
      onChangeHandler={onChangeHandler}
      handleAddFunction={handleAddCategory}
      handleDeleteByIdFuntion={handleDeleteCategory}
      setNewData={setNewData}
    />
  );
};

export default CategoryDrop;
