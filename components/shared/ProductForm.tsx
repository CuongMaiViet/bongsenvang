"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productFormSchema } from "@/lib/validator";
import * as z from "zod";
import { productDefaultValues, translator as t } from "@/constants";
import { capitalize as cap } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { Tag, TagInput } from "../tag/tag-input";

import "react-datepicker/dist/react-datepicker.css";
import DoubleInput from "./DoubleInput";
import { CategoryDrop, DistributerDrop, FormulationDrop } from "./dropdown";

type ProductFormProps = {
  userId: string;
  type: "Create" | "Update";
};

const ProductForm = ({ userId, type }: ProductFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [keyDistributedTags, setKeyDistributedTags] = useState<Tag[]>([]);
  const [keyCharacteristicTags, setKeyCharacteristicTags] = useState<Tag[]>([]);
  const [keyBenefitTags, setKeyBenefitTags] = useState<Tag[]>([]);
  const initialValues = productDefaultValues;

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
  });

  const { setValue } = form;

  function tagsToArrayOfString(newTags: SetStateAction<Tag[]>) {
    return (newTags as unknown as Tag[]).map((e) => e.value);
  }

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.title)}</legend>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Điền vào đây..."
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.registrationNumber)}</legend>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Điền vào đây..."
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.category)}</legend>
                </FormLabel>
                <FormControl>
                  <CategoryDrop
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Thuốc thuộc dạng chủng loại nào. Ví dụ như thuốc diệt cỏ,
                  thuốc diệt chuột, ...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="formulation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.formulation)}</legend>
                </FormLabel>
                <FormControl>
                  <FormulationDrop
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Thuốc có hóa chất công thức nào. Ví dụ như WP, CS, EC, ...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="manual.intro"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.intro)}</legend>
                </FormLabel>
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Điền vào đây..."
                    {...field}
                    className="textarea rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.image)}</legend>
                </FormLabel>
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="benefit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.benefit)}</legend>
                </FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Điền vào đây và nhấn Enter..."
                    tags={keyBenefitTags}
                    inputFieldPostion="top"
                    direction="row"
                    variant={"primary"}
                    shape={"rounded"}
                    borderStyle={"none"}
                    animation={"slideIn"}
                    textStyle={"italic"}
                    truncate={10}
                    className="input-field"
                    setTags={(newTags) => {
                      setKeyBenefitTags(newTags); //set tag and show tag on screen
                      setValue(
                        "benefit",
                        tagsToArrayOfString(newTags) as [string, ...string[]]
                      ); //add value to form with corresponding key
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Những công dụng nổi trội của sản phẩm
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="characteristic"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.characteristic)}</legend>
                </FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Điền vào đây và nhấn Enter..."
                    tags={keyCharacteristicTags}
                    inputFieldPostion="top"
                    direction="row"
                    variant={"primary"}
                    shape={"rounded"}
                    borderStyle={"none"}
                    animation={"slideIn"}
                    textStyle={"italic"}
                    truncate={10}
                    className="input-field"
                    setTags={(newTags) => {
                      setKeyCharacteristicTags(newTags); //set tag and show tag on screen
                      setValue(
                        "characteristic",
                        tagsToArrayOfString(newTags) as [string, ...string[]]
                      ); //add value to form with corresponding key
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Sản phẩm có độc hại hay có những tính chất nào gây nguy hiểm
                  cho người hay không?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.price)}</legend>
                </FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-lg bg-grey-50 px-4 py-2">
                    <Image
                      src={"/assets/icons/dollar.svg"}
                      alt="price"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="Điền vào đây..."
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Giá thành sản phẩm | Đơn vị: VNĐ
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mfg"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.mfg)}</legend>
                </FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-lg bg-grey-50 px-4 py-2">
                    <Image
                      src={"/assets/icons/calendar.svg"}
                      alt="mfg"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      Ngày/tháng/năm:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      dateFormat={"dd/MM/yyyy"}
                      wrapperClassName="datePicker"
                      name="mfg"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.exp)}</legend>
                </FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-lg bg-grey-50 px-4 py-2">
                    <Image
                      src={"/assets/icons/calendar.svg"}
                      alt="exp"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <Input
                      placeholder="Điền vào đây..."
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Hạn sử dụng bao nhiêu lâu kể từ ngày sản xuất | Đơn vị: năm
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="manufacturerId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.manufacturer)}</legend>
                </FormLabel>
                <FormControl>
                  <ManufacturerDrop
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Công ty chịu trách nhiệm sản xuất sản phẩm
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="packagerId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.packager)}</legend>
                </FormLabel>
                <FormControl>
                  <PackagerDrop
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Công ty chịu trách nhiệm đóng gói sản phẩm
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registerId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.register)}</legend>
                </FormLabel>
                <FormControl>
                  <RegisterDrop
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Công ty chịu trách nhiệm đăng ký sản phẩm
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="distributer"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.distributer)}</legend>
                </FormLabel>
                <FormControl>
                  <DistributerDrop
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Công ty chịu trách nhiệm phân phối sản phẩm
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="distributedAt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">
                    {cap(t.distributedAtCountry)}
                  </legend>
                </FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Điền vào đây và nhấn Enter..."
                    tags={keyDistributedTags}
                    inputFieldPostion="top"
                    direction="row"
                    variant={"primary"}
                    shape={"rounded"}
                    borderStyle={"none"}
                    animation={"slideIn"}
                    textStyle={"italic"}
                    truncate={10}
                    className="input-field"
                    setTags={(newTags) => {
                      setKeyDistributedTags(newTags); //set tag and show tag on screen
                      setValue(
                        "distributedAt",
                        tagsToArrayOfString(newTags) as [string, ...string[]]
                      ); //add value to form with corresponding key
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="ingredients.cores"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.ingredient)}</legend>
                </FormLabel>
                <FormControl>
                  <DoubleInput />
                </FormControl>
                <FormDescription>
                  Những nguyên liệu chính làm ra sản phẩm
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size={"lg"}
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting
            ? "Đang xử lý..."
            : `${type === "Create" ? "Tạo mới" : "Cập nhật"} sản phẩm`}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
