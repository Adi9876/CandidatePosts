import express, { json } from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import skillsRoute from "./routes/skillRoute.js";
import authenticateToken from "./middleware/authMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/skills", skillsRoute);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

// app.get("/",(req,res)=>{
//     res.send("hi");
// })

// app.get("/api/protected", authenticateToken, (req, res) => {
//   res.json({
//     message: `Hello, ${req.user.username}! This is a protected route.`,
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
