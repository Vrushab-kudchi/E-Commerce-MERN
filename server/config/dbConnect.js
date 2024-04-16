import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log({ Error: error.message, Error: "Database Error" });
  }
};

export default dbConnect;
