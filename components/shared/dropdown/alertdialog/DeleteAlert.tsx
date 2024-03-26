import React from "react";
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
import { X } from "lucide-react";
import { IDropdownShowData } from "@/types";

type DeleteAlertProps = {
  data: IDropdownShowData;
  handleDeleteByIdFuntion: (id: string) => void;
};

const DeleteAlert = ({ data, handleDeleteByIdFuntion }: DeleteAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-red-400 hover:text-white rounded-sm h-full p-3">
        <X size={14} />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">
            Cảnh báo !!!
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Bạn có chắc muốn xóa{" "}
          <strong className="capitalize text-red-500">
            {data.abbreviation
              ? data.title + ` (${data.abbreviation})`
              : data.title}
          </strong>{" "}
          ra khỏi cơ sở dữ liệu? <br />
          Hãy lưu ý rằng một khi bạn đã xóa thì không thể khôi phục lại!
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Không</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteByIdFuntion(data._id)}>
            Chắc chắn
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
