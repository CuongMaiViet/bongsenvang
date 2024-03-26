import { translator as t } from "@/constants";
import * as z from "zod";

export const productFormSchema = z.object({
  title: z
    .string({
      required_error: "undefined",
      invalid_type_error: "invalid",
    })
    .min(1, `Vui lòng điền ${t.title}`)
    .trim(),
  registrationNumber: z
    .string({
      required_error: "undefined",
      invalid_type_error: "invalid",
    })
    .min(1, `Vui lòng điền ${t.registrationNumber} của sản phẩm`)
    .trim(),
  imageUrl: z
    .string({
      required_error: "undefined",
      invalid_type_error: "invalid",
    })
    .min(1, `Vui lòng thêm ${t.image}`)
    .trim(),
  price: z.string(),
  ingredients: z.object({
    cores: z.array(
      z.object({
        ingredientId: z.string({
          required_error: "undefined",
          invalid_type_error: "invalid",
        }),
        // .min(1, `Vui lòng chọn ${t.ingredient}`),
        amount: z.string({
          required_error: "undefined",
          invalid_type_error: "invalid",
        }),
        // .min(1, `Vui lòng điền ${t.amount}`),
      })
    ),
    additive: z.object({
      title: z.string(),
      amount: z.string({
        required_error: "undefined",
        invalid_type_error: "invalid",
      }),
      // .min(1, `Vui lòng điền ${t.amount}`),
    }),
  }),
  category: z
    .string({
      required_error: "undefined",
      invalid_type_error: "invalid",
    })
    .min(1, `Vui lòng chọn ${t.category} cho sản phẩm`),
  formulation: z
    .string({
      required_error: "undefined",
      invalid_type_error: "invalid",
    })
    .min(2, `Vui lòng điền ${t.formulationId}`),
  characteristic: z.string().array(),
  benefit: z.array(z.string()),
  manual: z.object({
    intro: z.string(),
    use: z.object({
      how: z.string(),
      when: z.string(),
    }),
    quarantine: z.string(),
    safetyInstruction: z.string(),
    afterUse: z.string(),
    firstAid: z.string(),
  }),
  removalTargets: z.array(
    z.object({
      pestId: z.string({
        required_error: "undefined",
        invalid_type_error: "invalid",
      }),
      // .min(1, `Vui lòng điền ${t.pestId}`),
      rating: z.string({
        required_error: "undefined",
        invalid_type_error: "invalid",
      }),
      // .min(1, `Vui lòng đánh giá ${t.rating}`),
    })
  ),
  mfg: z.date(),
  exp: z.string(),
  manufacturer: z.string(),
  register: z.string(),
  packager: z.string(),
  distributer: z.string().min(1, `Vui lòng chọn ${t.distributer} của sản phẩm`),
  distributedAt: z.array(z.string()),
});
