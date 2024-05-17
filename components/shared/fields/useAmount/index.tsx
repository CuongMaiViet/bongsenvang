import { forwardRef, useState } from "react";
import SelectField from "./SelectField";
import { Input } from "@/components/ui/input";
import { Delimiter } from "@/constants";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type CropPest = {
  crop: {
    _id: string;
    title: string;
  };
  pest: {
    _id: string;
    title: string;
  };
  amount: string;
};

const initialValue = {
  crop: {
    _id: "",
    title: "",
  },
  pest: {
    _id: "",
    title: "",
  },
  amount: "",
};

export type CropPestUploadData = {
  crop: string;
  pest: string;
  amount: string;
};

export interface CropPestProps<T> {
  setDataFromChild: React.Dispatch<React.SetStateAction<T[]>>;
}

const UseAmountField = forwardRef<
  HTMLInputElement,
  CropPestProps<CropPestUploadData>
>((props, ref) => {
  const { setDataFromChild } = props;
  const [cpObj, setCpObj] = useState<CropPest>(initialValue);
  const [cpUploadList, setCpUploadList] = useState<CropPestUploadData[]>([]);
  const [cpShowList, setCpShowList] = useState<CropPest[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCpObj((prevState) => ({ ...prevState, amount: e.target.value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Delimiter.Enter) {
      e.preventDefault();
      setCpUploadList((prevState) => [
        ...prevState,
        { crop: cpObj.crop._id, pest: cpObj.pest._id, amount: cpObj.amount },
      ]);
      setCpShowList((prevState) => [...prevState, cpObj]);
      setDataFromChild([
        ...cpUploadList,
        { crop: cpObj.crop._id, pest: cpObj.pest._id, amount: cpObj.amount },
      ]);
      setCpObj(initialValue);
    }
  };

  const onRemoveObj = (idToRemove: string) => {
    const newUploadCpData = cpUploadList.filter((c) => c.crop !== idToRemove);
    const newCpShowData = cpShowList.filter((c) => c.crop._id !== idToRemove);
    setCpUploadList(newUploadCpData);
    setCpShowList(newCpShowData);
    setDataFromChild(newUploadCpData);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 flex-col md:flex-row">
        <SelectField<CropPest>
          selectName="crop"
          value={cpObj?.crop._id}
          setValue={setCpObj}
        />
        <SelectField<CropPest>
          selectName="pest"
          value={cpObj?.pest._id}
          setValue={setCpObj}
        />
        <Input
          type="string"
          name="amount"
          value={cpObj.amount}
          placeholder="Liều lượng"
          className="input-field"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <span className="flex gap-3">
        {cpShowList.length > 0 &&
          cpShowList.map((c) => (
            <div key={c.crop._id} className="tag-item">
              {`${c.crop.title} : ${c.pest.title} : ${c.amount}`}
              <Button
                type="button"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event from bubbling up to the tag span
                  onRemoveObj(c.crop._id as string);
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
});

export default UseAmountField;
