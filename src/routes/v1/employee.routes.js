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

const router = Router();


//routes structure :- router.get/post/delete/put(route,authenticate middleware,authorize middleware,employee controller);

router.get("/", authenticate, authorize("admin"), getEmployees);
router.get("/:id", authenticate, authorize("admin"), getEmployeeById);
router.post("/", authenticate, authorize("admin"), createEmployee);
router.put("/:id", authenticate, authorize("admin"), updateEmployee);
router.delete("/:id", authenticate, authorize("admin"), deleteEmployee);

export default router;
