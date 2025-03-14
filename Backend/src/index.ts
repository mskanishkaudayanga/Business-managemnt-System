import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import BusinesRoutes from "./routes/business.routes";
import productRoutes from "./routes/product.routes";
import session from "express-session";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(BusinesRoutes)
app.use(productRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.use(session({
  secret: "your_secret_key", // Change this to a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour session
}));