import { Schema, model, models } from "mongoose";

export interface IPest extends Document {
  _id: string;
  title: string;
}

const PestSchema = new Schema({
  title: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Pest = models.Pest || model("Pest", PestSchema);
export default Pest;
