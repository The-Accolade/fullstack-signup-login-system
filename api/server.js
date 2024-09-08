import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./config/db.js";
import cors from "cors";


dotenv.config();

//connect to database
connectDB();

const app = express();
app.use(express.json()); //parses the body of the request, making it accessible on the backend
app.use(cors());
// app.use("/api", (req, res) => res.send({message: "Welcome to the api"}));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));