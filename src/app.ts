import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Ready at port ${PORT}`));
