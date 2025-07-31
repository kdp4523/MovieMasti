const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const showRoutes = require("./routes/showRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const movieRoutes = require("./routes/movieRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
require("dotenv").config({ path: "./.env" });

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});

app.use("/api/auth", authRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/theatre", theatreRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/review", reviewRoutes);

const mongoUri = process.env.MONGODB_CONNECTION_LINK || "mongodb://localhost:27017/moviemowa";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log("Please check your MongoDB connection string in .env file");
    console.log("For local MongoDB: MONGODB_CONNECTION_LINK=mongodb://localhost:27017/moviemowa");
    console.log("For MongoDB Atlas: MONGODB_CONNECTION_LINK=mongodb+srv://username:password@cluster.mongodb.net/moviemowa");
  }
};

connectToMongo();
