import { Router } from "express";
import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";


const router = Router();

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
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
  {
    id: 3,
    title: "Summer Wars",
    director: "Mamoru Hosoda",
    duration: 114,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7d/Summer_Wars_poster.jpg",
    description:
      "A young math genius solves a complex equation and inadvertently puts a virtual world's artificial intelligence in a position to destroy Earth.",
    budget: 18.7,
  },
  {
    id: 4,
    title: "The Meyerowitz Stories",
    director: "Noah Baumbach",
    duration: 112,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/af/The_Meyerowitz_Stories.png",
    description:
      "An estranged family gathers together in New York City for an event celebrating the artistic work of their father.",
  }
];

router.get("/", (req, res) => {
  const films = parse(jsonDbPath, defaultFilms);

  if (!req.query["minimum-duration"]) {
    return res.json(films);
  }

  const minFilmDuration = Number(req.query["minimum-duration"]);

  if(minFilmDuration <= 0 ||isNaN(minFilmDuration)) {
    return res.status(400).json({ message: "Invalid minimum duration)" });
  }
  const filteredFilms = defaultFilms.filter((film) => {
    return film.duration >= minFilmDuration;
  });
  return res.json(filteredFilms);
  
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === id);

  if(isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

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
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
     
  ){
    return res.sendStatus(400).json({ message: "Invalid format" });
  }

  const films = parse(jsonDbPath, defaultFilms);

  const existingFilm = films.find((film) =>
    film.title.toLowerCase() === newFilm.title.toLocaleLowerCase() && 
    film.director.toLocaleLowerCase() === newFilm.director.toLocaleLowerCase());

  if(existingFilm){
    return res.status(409).json({ message: "Film already exists" });
  }



  const newFilm = body as NewFilm;

  const nextId = 
    defaultFilms.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;

  const addedFilm: Film = {id : nextId, ...newFilm};
  

  films.push(addedFilm);

  serialize(jsonDbPath, films);

  return res.json(newFilm);
});

router.delete("/:id", (req, res) => {

  const id = parseInt(req.params.id);
  if(isNaN(id)){
    return res.status(400).json({ message: "Invalid ID" });
  }

  const films = parse(jsonDbPath, defaultFilms);

  const index = films.findIndex((film) => film.id === id);
  if(index === -1){
    return res.status(404).json({ message: "Film not found" });
  }

  const deletedFilm = films[index];
  films.splice(index, 1);

  serialize(jsonDbPath, films);

  return res.json(deletedFilm);

});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const films = parse(jsonDbPath, defaultFilms);

  const toUpdate = films.find((film) => film.id === id);

  if(isNaN(id)){
    return res.status(400).json({ message: "Invalid ID" });
  }
  if (!toUpdate) {
    return res.status(404).json({ message: "Film not found" });
  }

  const body : unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
    
  ){
    return res.sendStatus(400).json({ message: "Invalid format" });
  }

  const updatedFilm = {...toUpdate, ...(body as Partial<Film>)};
  films[films.indexOf(toUpdate)] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);

});

router.put("/:id", (req, res) => {
  const body : unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
    
  ){
    return res.sendStatus(400).json({ message: "Invalid format" });
  }

  const id = parseInt(req.params.id);

  const films = parse(jsonDbPath, defaultFilms);
  const toUpdate = films.find((film) => film.id === id);
  if(isNaN(id)){
    return res.status(400).json({ message: "Invalid ID" });
  }
  
  if(toUpdate){
    const updatedFilm = {...toUpdate, ...(body as Film)};
    films[films.indexOf(toUpdate)] = updatedFilm;
    serialize(jsonDbPath, films);
    return res.json(updatedFilm);
  }

  const newFilm = body as NewFilm;

  const nextId = 
    films.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;
  
  const addedFilm: Film = {id : nextId, ...newFilm};
  films.push(addedFilm);
  serialize(jsonDbPath, films);
  return res.json(addedFilm);

});



export default router;
