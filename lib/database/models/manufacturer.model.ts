import { Schema, model, models } from "mongoose";

const ManufacturerSchema = new Schema({
  title: { type: String, required: true, unique: true },
  contacts: {
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    website: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

const Manufacturer =
  models.Manufacturer || model("Manufacturer", ManufacturerSchema);
export default Manufacturer;
