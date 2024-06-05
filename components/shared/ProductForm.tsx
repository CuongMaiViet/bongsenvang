"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productFormSchema } from "@/lib/validator";
import * as z from "zod";
import { FieldName, productDefaultValues, translator as t } from "@/constants";
import { capitalize as cap } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import { Tag, TagInput } from "../tag/tag-input";
import "react-datepicker/dist/react-datepicker.css";
import IngredientDrop, { Ingredient } from "./fields/IngredientDrop";
import { useUploadThing } from "@/lib/uploadthing";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CategoryDrop,
  DistributerDrop,
  FormulationDrop,
  ManufacturerDrop,
  PackagerDrop,
  RegisterDrop,
} from "./fields";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import CropPestDrop, { CropPestUploadData } from "./fields/useAmount";
import { IProduct } from "@/lib/database/models/product.model";

type ProductFormProps = {
  userId: string;
  type: "Create" | "Update";
  product?: IProduct;
  productId?: string;
};

const ProductForm = ({
  userId,
  type,
  product,
  productId,
}: ProductFormProps) => {
  const initialValues = productDefaultValues;
  const initialPlaceHolder = "Điền vào đây...";

  const {
    Title,
    RegisNum,
    Cate,
    Formu,
    Intro,
    uHow,
    uWhen,
    uAmount,
    Note,
    Quarantine,
    SafeInstu,
    AfterUse,
    FirstAid,
    ImageUrl,
    Benefit,
    Char,
    Price,
    Mfg,
    Exp,
    Manufacturer,
    Packager,
    Register,
    Distributer,
    DisAt,
    Ingre,
  } = FieldName;

  const [files, setFiles] = useState<File[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const router = useRouter();

  const [keyDistributedTags, setKeyDistributedTags] = useState<Tag[]>([]);
  const [keyCharacteristicTags, setKeyCharacteristicTags] = useState<Tag[]>([]);
  const [keyBenefitTags, setKeyBenefitTags] = useState<Tag[]>([]);

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
  });

  function tagsToArrayOfString(newTags: SetStateAction<Tag[]>): string[] {
    return (newTags as Tag[]).map((e) => e.value);
  }

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    console.log(values);
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImage = await startUpload(files);

      if (!uploadedImage) return;

      uploadedImageUrl = uploadedImage[0].url;
    }

    if (type === "Create") {
      try {
        const newProduct = await createProduct({
          product: {
            ...values,
            imageUrl: uploadedImageUrl,
            exp: `${values.exp} năm`,
            price: `${values.price || 0} VNĐ`,
            manual: {
              ...values.manual,
              quarantine: `${values.manual.quarantine} ngày`,
            },
          },
          userId,
          path: "/profile",
        });

        if (newProduct) {
          form.reset();
          router.push(`/products/${newProduct._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!productId) {
        router.back();
        return;
      }

      try {
        const updatedProduct = await updateProduct({
          product: {
            ...values,
            _id: productId,
            imageUrl: uploadedImageUrl,
            exp: `${values.exp} năm`,
            price: `${values.price || 0} VNĐ`,
            manual: {
              ...values.manual,
              quarantine: `${values.manual.quarantine} ngày`,
            },
          },
          userId,
          path: `/products/${productId}`,
        });

        if (updatedProduct) {
          form.reset();
          router.push(`/products/${updatedProduct._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
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
            name={Title}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.title)}</legend>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={initialPlaceHolder}
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
            name={RegisNum}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.registrationNumber)}</legend>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={initialPlaceHolder}
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
            name={Cate}
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
            name={Formu}
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
            name={Intro}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.intro)}</legend>
                </FormLabel>
                <FormControl className="h-72">
                  <Textarea
                    placeholder={initialPlaceHolder}
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
            name={ImageUrl}
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
            name={uHow}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.useHow)}</legend>
                </FormLabel>
                <FormControl className="h-40">
                  <Textarea
                    placeholder={initialPlaceHolder}
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
            name={uWhen}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.useWhen)}</legend>
                </FormLabel>
                <FormControl className="h-40">
                  <Textarea
                    placeholder={initialPlaceHolder}
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
            name={Note}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.note)}</legend>
                </FormLabel>
                <FormControl className="h-40">
                  <Textarea
                    placeholder={initialPlaceHolder}
                    {...field}
                    className="textarea rounded-lg"
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
            name={Benefit}
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
                    textCase={"lowercase"}
                    truncate={10}
                    className="input-field"
                    setTags={(newTags) => {
                      setKeyBenefitTags(newTags); //set tag and show tag on screen
                      form.setValue(
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
            name={Char}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{`${cap(
                    t.characteristic
                  )}*`}</legend>
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
                    textCase={"lowercase"}
                    truncate={10}
                    className="input-field"
                    setTags={(newTags) => {
                      setKeyCharacteristicTags(newTags); //set tag and show tag on screen
                      form.setValue(
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
            name={SafeInstu}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{`${cap(
                    t.safetyInstruction
                  )}*`}</legend>
                </FormLabel>
                <FormControl className="h-40">
                  <Textarea
                    placeholder={initialPlaceHolder}
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
            name={AfterUse}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{`${cap(t.afterUse)}*`}</legend>
                </FormLabel>
                <FormControl className="h-40">
                  <Textarea
                    placeholder={initialPlaceHolder}
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
            name={FirstAid}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{`${cap(t.firstAid)}*`}</legend>
                </FormLabel>
                <FormControl className="h-40">
                  <Textarea
                    placeholder={initialPlaceHolder}
                    {...field}
                    className="textarea rounded-lg"
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
            name={Price}
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
                      type="number"
                      step={1000}
                      placeholder={initialPlaceHolder}
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
            name={Mfg}
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
                    <Input
                      placeholder={initialPlaceHolder}
                      {...field}
                      className="input-field"
                    />
                    {/* <p className="ml-3 whitespace-nowrap text-grey-600">
                      Ngày/tháng/năm:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      dateFormat={"dd/MM/yyyy"}
                      wrapperClassName="datePicker"
                      name="mfg"
                    /> */}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={Exp}
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
                      type="number"
                      placeholder={initialPlaceHolder}
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
            name={Manufacturer}
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
            name={Packager}
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
            name={Register}
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
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name={Distributer}
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
            name={DisAt}
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
                      form.setValue(
                        "distributedAtCountry",
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
            name={Ingre}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.ingredients)}</legend>
                </FormLabel>
                <FormControl>
                  <IngredientDrop
                    {...field}
                    setDataFromChild={(newValue) => {
                      setIngredients(newValue as Ingredient[]);
                      form.setValue("ingredients", newValue as Ingredient[]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Những nguyên liệu chính làm ra sản phẩm
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={Quarantine}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.quarantine)}</legend>
                </FormLabel>
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-lg bg-grey-50 px-4 py-2">
                    <Input
                      type="number"
                      placeholder={initialPlaceHolder}
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Thời gian cách ly trước khi thu hoạch là bao lâu | Đơn vị:
                  ngày
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name={uAmount}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel asChild>
                  <legend className="pb-1">{cap(t.useAmount)}</legend>
                </FormLabel>
                <FormControl>
                  <CropPestDrop
                    {...field}
                    setDataFromChild={(newValue) => {
                      form.setValue(
                        "manual.useAmount",
                        newValue as CropPestUploadData[]
                      );
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Liều lượng sử dụng khuyến cáo trên cây trồng cụ thể với sâu
                  bệnh cụ thể
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
