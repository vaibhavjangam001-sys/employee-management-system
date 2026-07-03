import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info("Server start successfully");
    console.log(`Server is running on http://localhost:${PORT} 🚀`);
  });

};

startServer();