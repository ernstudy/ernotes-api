import express from "express";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/index.js";
import apiRouter from "./routes/index.js";

import config from "./config/env.config.js";
const app = express();
app.use(express.json());

apiRouter(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
