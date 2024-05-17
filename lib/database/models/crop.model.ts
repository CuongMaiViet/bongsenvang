import { Schema, model, models } from "mongoose";

export interface ICrop extends Document {
  _id: string;
  title: string;
}

const CropSchema = new Schema({
  title: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Crop = models.Crop || model("Crop", CropSchema);
export default Crop;