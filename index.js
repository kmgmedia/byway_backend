require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const reviewRoutes = require("./routes/routes.reviews");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/reviews", reviewRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
