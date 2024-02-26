import { Schema } from "mongoose";

const PestSchema = new Schema({
  title: { type: String, required: true },
  group: { type: Schema.Types.ObjectId, ref: "PestGroup", required: true },
  createdAt: { type: Date, default: Date.now },
});
