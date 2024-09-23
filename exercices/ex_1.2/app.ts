import express from "express";
import requestCount from "./middlewares/requestCount";


import filmsRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestCount);
app.use("/films", filmsRouter);




export default app;
