import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log(
      "Mongo DB connected Successfully 🎊",
      connection.connection.host,
    );
  } catch (error) {
    console.error("Mongo DB connection failed 😢");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;
