"use client";

import { startTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { INewData } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { FieldName } from "@/constants";

type AddNewAlertProps = {
  selectName: string;
  translateSelectName: string;
  handleAddFunction: () => void;
  setNewData: React.Dispatch<React.SetStateAction<INewData>>;
};

const AddNewAlert = ({
  selectName,
  translateSelectName,
  setNewData,
  handleAddFunction,
}: AddNewAlertProps) => {
  const { Formu, Ingre, Distributer, Manufacturer, Packager, Register } =
    FieldName;

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    key: string,
    subKey: string = ""
  ) => {
    e.preventDefault();
    subKey === "contacts"
      ? setNewData((prevState) => ({
          ...prevState,
          [subKey]: {
            ...prevState[subKey],
            [key]: e.target.value,
          },
        }))
      : setNewData((prevState) => ({
          ...prevState,
          [key]: e.target.value,
        }));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
        Thêm mới +
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">
            {translateSelectName + " mới"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              type="text"
              placeholder={`(Bắt buộc) Tên ${translateSelectName} mới`}
              className="input-field mt-3"
              onChange={(e) => handleInputChange(e, "title")}
            />
            {selectName === Formu && (
              <Input
                type="text"
                placeholder={`Mã ${translateSelectName}`}
                className="input-field mt-3"
                onChange={(e) => handleInputChange(e, "abbreviation")}
              />
            )}

            {selectName === Ingre && (
              <Textarea
                placeholder={`Mô tả ${translateSelectName}`}
                className="textarea rounded-lg mt-3 h-40"
                onChange={(e) => handleInputChange(e, "desc")}
              />
            )}

            {(selectName === Distributer ||
              selectName === Manufacturer ||
              selectName === Packager ||
              selectName === Register) && (
              <>
                <Input
                  type="text"
                  placeholder={`Tên rút gọn của đơn vị`}
                  className="input-field mt-3"
                  onChange={(e) => handleInputChange(e, "shortTitle")}
                />
                <Input
                  type="text"
                  placeholder={`Địa chỉ ${translateSelectName}`}
                  className="input-field mt-3"
                  onChange={(e) => handleInputChange(e, "address", "contacts")}
                />
                <Input
                  type="text"
                  placeholder={`Điện thoại ${translateSelectName}`}
                  className="input-field mt-3"
                  onChange={(e) => handleInputChange(e, "phone", "contacts")}
                />
                <Input
                  type="text"
                  placeholder={`Email ${translateSelectName}`}
                  className="input-field mt-3"
                  onChange={(e) => handleInputChange(e, "email", "contacts")}
                />
                <Input
                  type="text"
                  placeholder={`Website ${translateSelectName}`}
                  className="input-field mt-3"
                  onChange={(e) => handleInputChange(e, "website", "contacts")}
                />
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(handleAddFunction)}>
            Thêm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddNewAlert;
