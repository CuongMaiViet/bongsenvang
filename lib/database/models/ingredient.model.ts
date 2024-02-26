import { Schema, model, models } from "mongoose";

const IngredientSchema = new Schema({
  title: { type: String, required: true, unique: true },
  actualName: { type: String },
  type: { type: String, enum: ["core", "additive"] },
  desc: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Ingredient = models.Ingredient || model("Ingredient", IngredientSchema);
export default Ingredient;
