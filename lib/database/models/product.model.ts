import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  title: string;
  slogan: string;
  registrationNumber: string;
  imageUrl: string;
  price?: string;
  ingredients: [{ ingredient: { _id: string; title: string }; amount: string }];
  category: { _id: string; title: string };
  formulation: { _id: string; title: string; abbreviation: string };
  characteristic?: string;
  benefit?: [string];
  manual: {
    intro?: string;
    useHow?: string;
    useWhen?: string;
    useAmount?: [
      {
        crop: { _id: string; title: string };
        pest: { _id: string; title: string };
        amount: string;
      }
    ];
    note?: string;
    quarantine?: string;
    safetyInstruction?: string;
    afterUse?: string;
    firstAid?: string;
  };
  mfg?: string;
  exp?: string;
  manufacturer: { _id: string; title: string; contacts: { address: string } };
  register: { _id: string; title: string; contacts: { address: string } };
  packager: { _id: string; title: string; contacts: { address: string } };
  distributer: { _id: string; title: string; shortTitle: string; contacts: { address: string } };
  distributedAtCountry: [string];
  createdBy: { _id: string }
}

const ProductSchema = new Schema({
  title: { type: String, required: true },
  registrationNumber: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: String },
  ingredients: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: "Ingredient",
        required: true,
      },
      amount: { type: String, required: true },
      _id: false,
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  formulation: {
    type: Schema.Types.ObjectId,
    ref: "Formulation",
    required: true,
  },
  characteristic: { type: [String] },
  benefit: { type: [String] },
  manual: {
    intro: { type: String },
    useHow: { type: String },
    useWhen: { type: String },
    useAmount: [
      {
        _id: false,
        crop: { type: Schema.Types.ObjectId, ref: "Crop" },
        pest: { type: Schema.Types.ObjectId, ref: "Pest" },
        amount: { type: String },
      },
    ],
    note: { type: String },
    quarantine: { type: String },
    safetyInstruction: { type: String },
    afterUse: { type: String },
    firstAid: { type: String },
  },
  mfg: { type: String },
  exp: { type: String },
  manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
  register: { type: Schema.Types.ObjectId, ref: "Register" },
  packager: { type: Schema.Types.ObjectId, ref: "Packager" },
  distributer: { type: Schema.Types.ObjectId, ref: "Distributer" },
  distributedAtCountry: { type: [String] },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
