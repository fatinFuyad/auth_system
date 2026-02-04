import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/connectDB.js";
import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/usersRouter.js";

dotenv.config({ path: "./.env" });
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // so we can send cookies in the request and handle authentication
  }),
);
app.use(express.json());
app.use(cookieParser()); // allows to parse cookie from the the incoming request ℹ️

// Handling Routes
app.get("/", (req, res) => {
  res.send("Hello from Authentication System 🔐");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  connectDB();
  console.log(`App is running on ${process.env.NODE_ENV} port: ${port} 🖥️`);
});
