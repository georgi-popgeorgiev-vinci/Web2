import express from "express";


import filmsRouter from "./routes/films";

const app = express();
let count = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use((req, _res, next) => {
    if(req.method === "GET") {
        count++;
        console.log(`Number of GET requests: ${count}`);
    }
    next();
});

app.use("/films", filmsRouter);



export default app;
