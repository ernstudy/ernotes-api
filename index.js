import express from "express";
import router from "./routes/index.js";
import apiRouter from "./routes/index.js";
const app = express();

apiRouter(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
