import { Router } from "express";
import {Film} from "../types";

const router = Router();


const films: Film[] = [
    {
      id: 1,
      title: "Inception",
      director: "Christopher Nolan",
      duration: 148,
      budget: 160,
      description: "A mind-bending thriller",
      imageUrl: "https://example.com/inception.jpg"
    },
    {
      id: 2,
      title: "The Matrix",
      director: "Lana Wachowski, Lilly Wachowski",
      duration: 136,
      budget: 63,
      description: "A sci-fi classic",
      imageUrl: "https://example.com/matrix.jpg"
    }
  ];

  router.get("/", (_req, res) => {
    return res.json(films);
  });
  
  export default router;