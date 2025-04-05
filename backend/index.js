import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Dozvoljena klijentska aplikacija
    credentials: true, // Omogući slanje kolačića
  })
);

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
