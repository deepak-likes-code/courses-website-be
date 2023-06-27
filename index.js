import express from "express";
import dotenv from "dotenv";
dotenv.config();
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import { connectToMongoDB } from "./database.js";
const app = express();
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

await connectToMongoDB();
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
