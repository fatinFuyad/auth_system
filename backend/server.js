import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./database/connectDB.js";
import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/usersRouter.js";

dotenv.config({ path: "./.env" });
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser()); // allows to parse cookie from the the incoming request ℹ️
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true, // so we can send cookies or auth headers in the request and handle authentication
  }),
);

// Handling Routes
app.get("/api/hello", (req, res) => {
  res.send("Hello from Authentication System 🔐");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

/////
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // any other routes will be handled by the fronted <BrowserRouter>
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const port = process.env.PORT;
app.listen(port, () => {
  connectDB();
  console.log(`App is running on ${process.env.NODE_ENV} port: ${port} 🖥️`);
});
