import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { router as authroute } from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth",authroute)

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Google Forms backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
