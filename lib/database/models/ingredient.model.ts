import { Schema, model, models } from "mongoose";

export interface IIngredient extends Document {
  _id: string;
  title: string;
  desc?: string;
}

const IngredientSchema = new Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Ingredient = models.Ingredient || model("Ingredient", IngredientSchema);
export default Ingredient;
