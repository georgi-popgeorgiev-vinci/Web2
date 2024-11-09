import {Router} from "express";
import { NewText } from "../types";
import { readAll, readOne, createOne, deleteOne, updateOne } from "../services/texts";

const router = Router();

const expectedLevels = ["easy", "medium", "hard"];

router.get("/", (req, res) => {
    //const level = "level" in req.query && typeof req.query["level"] === "string" ? req.query["level"]: undefined;
  const level = req.query.level && typeof req.query.level === "string" ? req.query.level : undefined;
  if (level !== undefined && !expectedLevels.includes(level)) {
    return res.sendStatus(400);
  }

  const filteredTexts = readAll(level);

  return res.send(filteredTexts);
});

router.get("/:id", (req, res) => {
  if(typeof req.params.id !== "string") {
    return res.status(400).json({ message: "Invalid ID" });
  }

    const text = readOne(req.params.id);

    if(!text) {
        return res.status(404).json({ message: "Text not found" });
    }

    return res.send(text);
});

router.post("/", (req, res) => {
    const body : unknown = req.body;

    if (
        !body ||
        typeof body !== "object" ||
        !("content" in body) ||
        !("level" in body) ||
        typeof body.content !== "string" ||
        typeof body.level !== "string" ||
        !body.content.trim() ||
        !expectedLevels.includes(body.level)    
    ) {
        return res.status(400).json({ message: "Invalid body" });
    }

    const newText = body as NewText;
    const newOne = createOne(newText);

    if(!newOne) {
        return res.status(409).json({ message: "Text already exists" });
    }

    return res.json(newOne);
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if(id !== "string") {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const deleted = deleteOne(id);
    if(!deleted) {
        return res.status(404).json({ message: "Text not found" });
    }

    return res.send(deleted);

});

router.put("/:id", (req, res) => {
    const body : unknown = req.body;

    if (
        !body ||
        typeof body !== "object" ||
        !("content" in body) ||
        !("level" in body) ||
        typeof body.content !== "string" ||
        typeof body.level !== "string" ||
        !body.content.trim() ||
        !expectedLevels.includes(body.level)    
    ) {
        return res.status(400).json({ message: "Invalid body" });
    }

    const id = req.params.id;

    if(id !== "string") {
        return res.status(400).json({ message: "Invalid ID" });
    }

    const newText = body as NewText;
    const updated = updateOne(id, newText);

    if(!updated) {
        return res.status(404).json({ message: "Text not found" });
    }

    return res.send(updated);
});

export default Router();