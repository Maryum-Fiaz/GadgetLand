import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middleware/error.js";

// Handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

// Database connection
connectDatabase();

// cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.set("query parser", "extended");
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

app.use(cookieParser());

// Import all Routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import chatRoute from './routes/chat.js';

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);
app.use('/api/v1', chatRoute);

// Using error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(
    `App listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`,
  );
});

// Handle Unhandled promise rejection (async error)
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  }); // server shut down
});
