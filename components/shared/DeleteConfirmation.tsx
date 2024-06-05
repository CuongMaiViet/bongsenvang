'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

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
} from '@/components/ui/alert-dialog'

import { deleteProduct } from '@/lib/actions/product.actions'

export const DeleteConfirmation = ({ productId }: { productId: string }) => {
  const pathname = usePathname()
  let [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Hành động này sẽ xóa vĩnh viễn sản phẩm ra khỏi cơ sở dữ liệu
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteProduct({ productId, path: pathname })
              })
            }>
            {isPending ? 'Đang xóa...' : 'Xóa'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}