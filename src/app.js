import express from "express";
import employeeRoutes from "./routes/v1/employee.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/v1/auth.routes.js";

const app = express();

// middleware :-
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static("uploads"));

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Employee Management System Backend 🚀");
});
app.use(errorHandler);

export default app;
