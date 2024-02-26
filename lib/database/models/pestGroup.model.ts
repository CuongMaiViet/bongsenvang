import { Schema, model, models } from "mongoose";

const PestGroupSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    enum: ["chuột", "nấm", "sâu", "rệp", "bọ", "cỏ", "nhện"],
  },
  abbreviation: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const PestGroup = models.PestGroup || model("PestGroup", PestGroupSchema);
export default PestGroup;
