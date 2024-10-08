import { Router } from "express";
import { NewFilm } from "../types";
import {
  readAll,
  readOne,
  createOne,
  deleteOne,
  updateOne,
} from "../services/films";


const router = Router();


router.get("/", (req, res) => {

  const minFilmDuration = "minimum-duration" in req.query ?
    Number(req.query["minimum-duration"]) : undefined;

  if(minFilmDuration !== undefined && (isNaN(minFilmDuration) || minFilmDuration <= 0)){
    return res.status(400).json({ message: "Invalid minimum duration" });
  }

  const filteredFilms = readAll(minFilmDuration);
  
  return res.send(filteredFilms);
  
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const film = readOne(id);

  if(isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  if (!film) {
    return res.status(404).json({ message: "Film not found" });
  }
  return res.send(film);
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

  const newFilm = body as NewFilm;


  const addedFilm = createOne(newFilm);
  
  if (!addedFilm) {
    return res.status(400).json({ message: "Film already exists" });

  }
  return res.json(addedFilm);
});

router.delete("/:id", (req, res) => {

  const id = parseInt(req.params.id);
  if(isNaN(id)){
    return res.status(400).json({ message: "Invalid ID" });
  }

  const deletedFilm = deleteOne(id);

  if (!deletedFilm) {
    return res.status(404).json({ message: "Film not found" });
  }
  

  return res.json(deletedFilm);

});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if(isNaN(id)){
    return res.status(400).json({ message: "Invalid ID" });
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

  const updatedFilm = updateOne(id, body as Partial<NewFilm>);

  if (!updatedFilm) {
    return res.status(404).json({ message: "Film not found" });
  }


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

  
  if(isNaN(id)){
    return res.status(400).json({ message: "Invalid ID" });
  }
  
  const updateOrCreateFilm = updateOne(id, body as Partial<NewFilm>);

  if (!updateOrCreateFilm) {
    return res.status(404).json({ message: "Film not found" });
  }

  return res.json(updateOrCreateFilm);
 

});



export default router;
