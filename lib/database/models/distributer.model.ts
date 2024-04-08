import { Schema, model, models } from "mongoose";

const DistributerSchema = new Schema({
  title: { type: String, required: true, unique: true },
  shortTitle: { type: String },
  contacts: {
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    website: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

const Distributer =
  models.Distributer || model("Distributer", DistributerSchema);
export default Distributer;
