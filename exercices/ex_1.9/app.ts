import express from "express";
import requestCount from "./middlewares/requestCount";

import textsRouter from "./routes/texts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestCount);
app.use("/texts", textsRouter);

export default app;
