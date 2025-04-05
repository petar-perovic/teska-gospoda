import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/categoryCountWarnings.js";
import fiveFiles from "./routes/five.js";
import logFilterRoutes from "./routes/filter.js";
import errorRoutes from "./routes/error.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

app.use("/api/category", authRoutes);
app.use("/api/logs", logFilterRoutes);
app.use("/api/drugi", fiveFiles);
app.use("/api/treci", errorRoutes);



const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});