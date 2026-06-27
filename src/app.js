import express from "express";
import employeeRouter from "./routes/v1/employee.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// middleware :-
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/employees", employeeRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Employee Management System Backend 🚀");
});
app.use(errorHandler);

export default app;
