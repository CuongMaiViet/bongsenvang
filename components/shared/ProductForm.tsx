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
import Dropdown from "./Dropdown";
import { capitalize as cap } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { Tag, TagInput } from "../tag/tag-input";

import "react-datepicker/dist/react-datepicker.css";

type ProductFormProps = {
  userId: string;
  type: "Create" | "Update";
};

const ProductForm = ({ userId, type }: ProductFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const initialValues = productDefaultValues;

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
  });

  const { setValue } = form;

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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.category)}</legend>
                </FormLabel>
                <FormControl>
                  <Dropdown
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
            name="formulationId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.formulation)}</legend>
                </FormLabel>
                <FormControl>
                  <Dropdown
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
            name="characteristic"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.characteristic)}</legend>
                </FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-lg bg-grey-50 px-4 py-2">
                    <Image
                      src={"/assets/icons/chemical.svg"}
                      alt="chemical"
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
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
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

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="manufacturerId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.manufacturer)}</legend>
                </FormLabel>
                <FormControl>
                  <Dropdown
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
                  <Dropdown
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
                  <Dropdown
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
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="distributerId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.distributer)}</legend>
                </FormLabel>
                <FormControl>
                  <Dropdown
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
                    tags={tags}
                    inputFieldPostion="top"
                    direction="row"
                    variant={"primary"}
                    shape={"rounded"}
                    borderStyle={"none"}
                    animation={"slideIn"}
                    textStyle={"italic"}
                    className="input-field"
                    setTags={(newTags) => {
                      setTags(newTags); //show tag on screen
                      setValue("distributedAt", newTags as [Tag, ...Tag[]]); //add value to form with corresponding key
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProductForm;
