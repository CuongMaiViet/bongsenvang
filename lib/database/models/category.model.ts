import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  title: string;
}

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "thuốc diệt chuột",
      "thuốc diệt nấm",
      "thuốc diệt sâu",
      "thuốc diệt rệp",
      "thuốc diệt bọ",
      "thuốc diệt cỏ",
      "thuốc diệt nhện",
    ],
  },
  // targetPestGroup: {
  //   type: Schema.Types.ObjectId,
  //   ref: "PestGroup",
  //   required: true,
  // },
  createdAt: { type: Date, default: Date.now },
});

const Category = models.Category || model("Category", CategorySchema);
export default Category;
