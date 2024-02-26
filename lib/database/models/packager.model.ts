import { Schema, model, models } from "mongoose";

const PackagerSchema = new Schema({
  title: { type: String, required: true, unique: true },
  contacts: {
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    website: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

const Packager = models.Packager || model("Packager", PackagerSchema);
export default Packager;
