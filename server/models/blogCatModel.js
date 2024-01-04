import mongoose from "mongoose";

var blogcategorySchema = new mongoose.Schema(
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
export default mongoose.model("BCategory", blogcategorySchema);
