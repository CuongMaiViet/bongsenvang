import { Schema, model, models } from "mongoose";

const FormulationSchema = new Schema({
  title: { type: String, required: true, unique: true },
  abbreviation: { type: String, required: true },
  desc: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Formulation =
  models.Formulation || model("Formulation", FormulationSchema);
export default Formulation;
