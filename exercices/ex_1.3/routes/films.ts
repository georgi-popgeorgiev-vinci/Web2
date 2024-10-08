import { Router } from "express";
import { Film, NewFilm } from "../types";

const router = Router();

const films: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description: "A mind-bending thriller",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63,
    description: "A sci-fi classic",
    imageUrl: "https://example.com/matrix.jpg",
  },
];

router.get("/", (req, res) => {

  if (!req.query["minimum-duration"]) {
    return res.json(films);
  }

  const minFilmDuration = Number(req.query["minimum-duration"]);
  const filteredFilms = films.filter((film) => {
    return film.duration >= minFilmDuration;
  });
  return res.json(filteredFilms);
  
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film) {
    return res.status(404).json({ message: "Film not found" });
  }
  return res.json(film);
});

router.post("/", (req, res) => {
  const body : unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body["title"] !== "string" ||
    typeof body["director"] !== "string" ||
    typeof body["duration"] !== "number" ||
    body.title.trim() === "" ||
    body.director.trim() === "" ||
    body.duration <= 0
    
    
  ){
    return res.sendStatus(400);
  }

  const {title, director, duration} = body as NewFilm;

  const newFilm: Film = {
    id: films.length + 1,
    title,
    director,
    duration,
  };

  films.push(newFilm);
  return res.json(newFilm);
});

export default router;
