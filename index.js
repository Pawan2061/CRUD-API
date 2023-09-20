const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const router = express.Router();
require("./src/db/conn");  // db connection
const authRoute = require("./src/routes/authRouter");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRoute);

const PORT = process.env.PORT ?? 3000;  // Null coalescing Operator

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
