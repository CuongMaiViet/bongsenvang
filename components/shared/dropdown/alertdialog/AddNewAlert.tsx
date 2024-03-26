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
              placeholder={`Tên ${translateSelectName} mới`}
              className="input-field mt-3"
              onChange={(e) =>
                setNewData((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
            />
            {selectName === "formulation" && (
              <Input
                type="text"
                placeholder={`Mã ${translateSelectName}`}
                className="input-field mt-3"
                onChange={(e) =>
                  setNewData((prevState) => ({
                    ...prevState,
                    abbreviation: e.target.value,
                  }))
                }
              />
            )}

            {selectName === "distributer" && (
              <>
                <Input
                  type="text"
                  placeholder={`Tên rút gọn của đơn vị`}
                  className="input-field mt-3"
                  onChange={(e) =>
                    setNewData((prevState) => ({
                      ...prevState,
                      shortTitle: e.target.value,
                    }))
                  }
                />
                <Input
                  type="text"
                  placeholder={`Địa chỉ ${translateSelectName}`}
                  className="input-field mt-3"
                  onChange={(e) =>
                    setNewData((prevState) => ({
                      ...prevState,
                      contacts: {
                        ...prevState.contacts,
                        address: e.target.value,
                      },
                    }))
                  }
                />
                <Input
                  type="text"
                  placeholder={`Điện thoại ${translateSelectName}`}
                  className="input-field mt-3"
                  onChange={(e) =>
                    setNewData((prevState) => ({
                      ...prevState,
                      contacts: {
                        ...prevState.contacts,
                        phone: e.target.value,
                      },
                    }))
                  }
                />
                <Input
                  type="text"
                  placeholder={`Email ${translateSelectName}`}
                  className="input-field mt-3"
                  onChange={(e) =>
                    setNewData((prevState) => ({
                      ...prevState,
                      contacts: {
                        ...prevState.contacts,
                        email: e.target.value,
                      },
                    }))
                  }
                />
                <Input
                  type="text"
                  placeholder={`Website ${translateSelectName}`}
                  className="input-field mt-3"
                  onChange={(e) =>
                    setNewData((prevState) => ({
                      ...prevState,
                      contacts: {
                        ...prevState.contacts,
                        website: e.target.value,
                      },
                    }))
                  }
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
