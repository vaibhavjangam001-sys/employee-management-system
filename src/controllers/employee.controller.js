import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const getEmployees = asyncHandler(async (req, res) => {
  res.send("Employee Controller is working");
});

const createEmployee = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, position, salary } = req.body;

  if (name.trim().length < 3) {
    throw new ApiError(400, "Name must be at least 3 characters long");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email address");
  }

  if (position.trim().length < 2) {
    throw new ApiError(400, "Position must be at least 2 characters long");
  }

  if (salary <= 1000) {
    throw new ApiError(400, "Salary must be greater than 1000");
  }

  res.status(200).json({
    success: true,
    message: "Employee created successfully",
    data: req.body,
  });
});

export { getEmployees, createEmployee };
