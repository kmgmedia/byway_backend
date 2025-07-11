const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const reviewRoutes = require("./routes/routes.reviews");
const productRoutes = require("./routes/routes.products");
const testimonialRoutes = require("./routes/routes.testimonials");
const cronRoutes = require("./routes/routes.cron.routes");
const categoryRoutes = require("./routes/categoryRoutes");


const { errorHandler } = require("./middleware/middleware/errorMiddleware");





dotenv.config();
connectDB();

// Import cron job to delete expired users
require("./cron/deleteExpiredUsers");


const app = express();
const PORT = process.env.PORT || 5000;



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/testimonials", testimonialRoutes);
// Route to auth logs
const authRoutes = require("./routes/routes.auth.routes");
app.use("/api/auth", authRoutes);
app.use("/api/cron", cronRoutes);
app.use("/api/categories", categoryRoutes);



// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


