import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import articleRoutes from "./src/routes/articleRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.json({ message: "BeyondChats API running 🚀" });
});

// mongodb connecn logic
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
