import { Router } from "express";
import {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../../controllers/employee.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import upload from "../../middlewares/upload.middleware.js";

const router = Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     description: Retrieve a list of all employees.
 *     tags:
 *       - Employees
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Employees fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     description: Retrieve a single employee using employee ID.
 *     tags:
 *       - Employees
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee fetched successfully
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticate, authorize("admin"), getEmployeeById);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     description: Create a new employee with profile image.
 *     tags:
 *       - Employees
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *               - position
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               department:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("profileImage"),
  createEmployee
);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update employee
 *     description: Update employee details by ID.
 *     tags:
 *       - Employees
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               department:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  upload.single("profileImage"),
  updateEmployee
);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete employee
 *     description: Delete an employee using employee ID.
 *     tags:
 *       - Employees
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticate, authorize("admin"), deleteEmployee);

export default router;