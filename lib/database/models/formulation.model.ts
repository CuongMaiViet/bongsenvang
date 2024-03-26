import { Schema, model, models } from "mongoose";

export interface IFormulation extends Document {
  _id: string;
  title: string;
  abbreviation: string;
}

const FormulationSchema = new Schema({
  title: { type: String, required: true, unique: true },
  abbreviation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Formulation =
  models.Formulation || model("Formulation", FormulationSchema);
export default Formulation;
