import { Schema, model, models } from "mongoose";

const RegisterSchema = new Schema({
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

const Register = models.Register || model("Register", RegisterSchema);
export default Register;
