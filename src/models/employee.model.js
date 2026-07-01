import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 18,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    profileImage : {
      type : String,
      default : null,
    }
  },
  { timestamps: true },
);
const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
