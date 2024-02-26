import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  registrationNumber: string;
  imagesUrl: string;
  price?: string;
  isFree: boolean;
  ingredients: {
    cores: [{ ingredient: { _id: string; title: string }; amount: string }];
    additive: { title: string; amount: string };
  };
  category: { _id: string; title: string };
  formulation: { _id: string; title: string; abbreviation: string };
  characteristic?: string;
  benefit?: [string];
  manual: {
    intro?: string;
    use?: { how?: string; when?: string };
    quarantine?: string;
    safetyInstruction?: string;
    afterUse?: string;
    firstAid?: string;
  };
  removalTargets: [
    {
      pest: {
        _id: string;
        title: string;
        group: { _id: string; title: string };
      };
      rating: string;
    }
  ];
  mfg?: Date;
  exp?: string;
  manufacturer: { _id: string; title: string; contacts: { address: string } };
  register: { _id: string; title: string; contacts: { address: string } };
  packager: { _id: string; title: string; contacts: { address: string } };
  distributer: { _id: string; title: string; contacts: { address: string } };
  distributedAt: { country: string };
}

const ProductSchema = new Schema({
  title: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  imagesUrl: { type: String, required: true },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  ingredients: {
    cores: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        amount: { type: String, required: true },
      },
    ],
    additive: {
      title: { type: String, default: "Phụ gia" },
      amount: { type: String, required: true },
    },
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  formulation: {
    type: Schema.Types.ObjectId,
    ref: "Formulation",
    required: true,
  },
  characteristic: { type: String },
  benefit: { type: [String] },
  manual: {
    intro: { type: String },
    use: {
      how: { type: String },
      when: { type: String },
    },
    quarantine: { type: String },
    safetyInstruction: { type: String },
    afterUse: { type: String },
    firstAid: { type: String },
  },
  removalTargets: [
    {
      pest: { type: Schema.Types.ObjectId, ref: "Pest", required: true },
      rating: {
        type: String,
        enum: ["excellent", "good", "average", "poor", "very bad"],
        required: true,
      },
    },
  ],
  mfg: { type: Date },
  exp: { type: String },
  manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
  register: { type: Schema.Types.ObjectId, ref: "Register" },
  packager: { type: Schema.Types.ObjectId, ref: "Packager" },
  distributer: { type: Schema.Types.ObjectId, ref: "Distributer" },
  distributedAt: {
    country: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
