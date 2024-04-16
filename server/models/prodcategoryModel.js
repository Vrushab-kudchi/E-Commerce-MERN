import mongoose from "mongoose";

var prodcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.model("PCategory", prodcategorySchema);
