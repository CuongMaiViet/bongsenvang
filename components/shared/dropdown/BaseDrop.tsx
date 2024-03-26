import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translator as t } from "@/constants";
import { DropdownProps, IDropdownShowData, INewData } from "@/types";
import { cn } from "@/lib/utils";
import DeleteAlert from "./alertdialog/DeleteAlert";
import AddNewAlert from "./alertdialog/AddNewAlert";

interface BaseProps extends DropdownProps {
  data: IDropdownShowData[];
  selectName: string;
  handleAddFunction: () => void;
  handleDeleteByIdFuntion: (id: string) => void;
  setNewData: React.Dispatch<React.SetStateAction<INewData>>;
}

const BaseDrop = ({
  data,
  value,
  selectName,
  onChangeHandler,
  handleAddFunction,
  handleDeleteByIdFuntion,
  setNewData,
}: BaseProps) => {
  const translateSelectName = t[selectName as keyof typeof t];

  return (
    <Select
      onValueChange={onChangeHandler}
      defaultValue={value}
      name={selectName}
    >
      <SelectTrigger className="select-field capitalize">
        <SelectValue placeholder={translateSelectName} />
      </SelectTrigger>
      <SelectContent>
        {data.length > 0 &&
          data.map((e) => (
            <div className="flex-center gap-1" key={e._id}>
              <SelectItem
                value={e._id}
                className={cn(
                  "select-item p-regular-14",
                  selectName === "distributer" ? "uppercase" : "capitalize"
                )}
              >
                {e.abbreviation ? e.title + ` (${e.abbreviation})` : e.title}
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
  );
};

export default BaseDrop;
