import mongoose from "mongoose";

const validateMongodbid = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This ID is not valid or not found");
  }
};

export default validateMongodbid;
