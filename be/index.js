import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import db from "./config/db.js";
import { errorHandler, pageNotFound } from "./middlewares/error.middleware.js";

import userRouter from "./routes/users.routes.js";
import petsRouter from "./routes/pets.routes.js";

dotenv.config();
db();

const app = express();
const baseURL = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(`${baseURL}/users`, userRouter);
app.use(`${baseURL}/pets`, petsRouter);
// app.use("/", (request, response) => response.send({ app: "pet_adoption" }));

app.use(pageNotFound);
app.use(errorHandler);

// Comment out when testing
app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);

export default app;
