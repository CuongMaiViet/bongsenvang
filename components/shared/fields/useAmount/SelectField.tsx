import { useEffect, useState } from "react";
import {
  createCrop,
  deleteCrop,
  getAllCrops,
} from "@/lib/actions/crop.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translator as t } from "@/constants";
import { IDropdownShowData, INewData } from "@/types";
import AddNewAlert from "../alertdialog/AddNewAlert";
import DeleteAlert from "../alertdialog/DeleteAlert";
import {
  createPest,
  deletePest,
  getAllPests,
} from "@/lib/actions/pest.actions";

interface UseAmountSelectFieldProps<T> {
  selectName: string;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

const SelectField = <T extends {}>({
  selectName,
  value,
  setValue,
}: UseAmountSelectFieldProps<T>) => {
  const translateSelectName = t[selectName as keyof typeof t];

  const [showData, setShowData] = useState<IDropdownShowData[]>([]);
  const [newData, setNewData] = useState<INewData>({
    title: "",
  });

  const findTitleByID = (data: IDropdownShowData[], id: string): string => {
    return data.find((e) => e._id === id)?.title as string;
  };

  const handleAddValue = () => {
    selectName === "crop"
      ? createCrop({
          cropTitle: newData.title.trim(),
        }).then((data) => setShowData((prevState) => [...prevState, data]))
      : selectName === "pest"
      ? createPest({
          pestTitle: newData.title.trim(),
        }).then((data) => setShowData((prevState) => [...prevState, data]))
      : console.log(selectName);
  };

  const handleDeleteValue = (id: string) => {
    selectName === "crop"
      ? deleteCrop(id).then((data) => setShowData(data))
      : selectName === "pest"
      ? deletePest(id).then((data) => setShowData(data))
      : console.log(selectName);
  };

  const handleSelectChange = (e: string) => {
    selectName === "crop"
      ? setValue((prevState) => ({
          ...prevState,
          crop: { _id: e, title: findTitleByID(showData, e) },
        }))
      : selectName === "pest"
      ? setValue((prevState) => ({
          ...prevState,
          pest: { _id: e, title: findTitleByID(showData, e) },
        }))
      : console.log(selectName);
  };

  useEffect(() => {
    const getData = async () => {
      const fetchData =
        selectName === "crop"
          ? await getAllCrops()
          : selectName === "pest" && (await getAllPests());
      fetchData && setShowData(fetchData as IDropdownShowData[]);
    };

    getData();
  }, []);

  return (
    <Select name={selectName} value={value} onValueChange={handleSelectChange}>
      <SelectTrigger className="select-field capitalize">
        <SelectValue placeholder={`Vui lòng chọn ${translateSelectName}`} />
      </SelectTrigger>
      <SelectContent>
        {showData.length > 0 &&
          showData.map((e) => (
            <div className="flex-center gap-1" key={e._id}>
              <SelectItem
                value={e._id}
                className={"select-item p-regular-14 capitalize"}
              >
                {e.title}
              </SelectItem>

              <DeleteAlert
                data={e}
                handleDeleteByIdFuntion={handleDeleteValue}
              />
            </div>
          ))}

        <AddNewAlert
          selectName={selectName}
          translateSelectName={translateSelectName}
          setNewData={setNewData}
          handleAddFunction={handleAddValue}
        />
      </SelectContent>
    </Select>
  );
};

export default SelectField;
