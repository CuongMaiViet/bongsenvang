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

type ProductFormProps = {
  userId: string;
  type: "Create" | "Update";
};

const ProductForm = ({ userId, type }: ProductFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = productDefaultValues;

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{cap(t.title)}</FormLabel>
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
                <FormLabel>{cap(t.registrationNumber)}</FormLabel>
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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{cap(t.category)}</FormLabel>
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
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="manual.intro"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{cap(t.intro)}</FormLabel>
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
                <FormLabel>{cap(t.image)}</FormLabel>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProductForm;
