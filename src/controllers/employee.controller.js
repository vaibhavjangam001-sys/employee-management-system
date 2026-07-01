import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Employee from "../models/employee.model.js";
import { response } from "express";

// fetch all employees
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();

  res.status(200).json({
    success: true,
    message: "Employees fetched successfully",
    data: employees,
  });
});

// find employee using id
const getEmployeeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const foundEmployee = await Employee.findById(id);

  if (!foundEmployee) {
    throw new ApiError(404, "Employee not found");
  }

  res.status(200).json({
    success: true,
    message: "Employee fetched successfully",
    data: foundEmployee,
  });
});

// create employee
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, age, department, salary, position } = req.body;

  if (
    !name ||
    !email ||
    age === undefined ||
    age === null ||
    !department ||
    salary === undefined ||
    salary === null ||
    !position
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedDepartment = department.trim();
  const trimmedPosition = position.trim();

  if (!trimmedName || !trimmedEmail || !trimmedDepartment || !trimmedPosition) {
    throw new ApiError(400, "Fields cannot be empty");
  }

  if (trimmedName.length < 2) {
    throw new ApiError(400, "Name must be at least 2 characters long");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    throw new ApiError(400, "Invalid email address");
  }

  if (Number(age) < 18) {
    throw new ApiError(400, "Age must be greater than or equal to 18");
  }

  if (Number(salary) <= 1000) {
    throw new ApiError(400, "Salary must be greater than 1000");
  }

  if (trimmedPosition.length < 2) {
    throw new ApiError(400, "Position must be at least 2 characters long");
  }

  const employeeAlreadyExists = await Employee.findOne({
    email: trimmedEmail,
  });

  if (employeeAlreadyExists) {
    throw new ApiError(400, "Employee already exists");
  }

  const createdEmployee = await Employee.create({
    name: trimmedName,
    email: trimmedEmail,
    age: Number(age),
    department: trimmedDepartment,
    salary: Number(salary),
    position: trimmedPosition,
    profileImage: req.file ? req.file.path : null,
  });

  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: createdEmployee,
  });
});

// update employee
const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedEmployee) {
    throw new ApiError(404, "Employee not found");
  }

  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    data: updatedEmployee,
  });
});

// delete employee
const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedEmployee = await Employee.findByIdAndDelete(id);

  if (!deletedEmployee) {
    throw new ApiError(404, "Employee not found");
  }

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
    data: deletedEmployee,
  });
});

export {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
