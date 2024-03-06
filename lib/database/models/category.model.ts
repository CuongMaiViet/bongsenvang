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
  },
  createdAt: { type: Date, default: Date.now },
});

const Category = models.Category || model("Category", CategorySchema);
export default Category;
