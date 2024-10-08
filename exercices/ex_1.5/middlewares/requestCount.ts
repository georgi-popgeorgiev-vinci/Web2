import { Request, Response, NextFunction } from "express";

let count = 0;

const requestCount = (req: Request, _res: Response, next: NextFunction) => {
  if (req.method === "GET") {
    count++;
    console.log(`Number of GET requests: ${count}`);
  }
  next();
};

export default requestCount;
