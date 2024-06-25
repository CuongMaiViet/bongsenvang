import * as z from "zod";
import { translator as t } from "@/constants";

export const productFormSchema = z.object({
  title: z.string().min(1, `Vui lòng điền ${t.title}`).trim(),
  slogan: z.string().trim(),
  displayType: z.string().trim(),
  registrationNumber: z
    .string()
    // .min(1, `Vui lòng điền ${t.registrationNumber} của sản phẩm`)
    .trim(),
  imageUrl: z.string().min(1, `Vui lòng thêm ${t.image}`).trim(),
  price: z.string(),
  ingredients: z.array(
    z.object({
      ingredient: z.string().min(1, `Vui lòng chọn ${t.ingredient}`),
      amount: z.string().min(1, `Vui lòng điền ${t.amount}`),
    })
  ),
  category: z.string().min(1, `Vui lòng chọn ${t.category} cho sản phẩm`),
  formulation: z.string().min(1, `Vui lòng điền ${t.formulation}`),
  characteristic: z.string().array(),
  benefit: z.array(z.string()),
  manual: z.object({
    intro: z.string(),
    useHow: z.string(),
    useWhen: z.string(),
    useAmount: z.array(
      z.object({
        crop: z.string(),
        pest: z.string(),
        amount: z.string(),
      })
    ),
    note: z.string(),
    quarantine: z.string(),
    safetyInstruction: z.string(),
    afterUse: z.string(),
    firstAid: z.string(),
  }),
  mfg: z.string(),
  exp: z.string(),
  manufacturer: z
    .string()
    .min(1, `Vui lòng chọn ${t.manufacturer} của sản phẩm`),
  register: z.string().min(1, `Vui lòng chọn ${t.register} của sản phẩm`),
  packager: z.string().min(1, `Vui lòng chọn ${t.packager} của sản phẩm`),
  distributer: z.string().min(1, `Vui lòng chọn ${t.distributer} của sản phẩm`),
  distributedAtCountry: z.array(z.string()),
});
