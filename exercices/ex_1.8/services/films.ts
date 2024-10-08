import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";

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

const readAll = (minimumDuration: number | undefined = undefined): Film[] => {
    const films = parse(jsonDbPath, defaultFilms);
    
    return minimumDuration ? films.filter(film => film.duration >= minimumDuration) : films;
};

const readOne = (id: number): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);
    
    return films.find(film => film.id === id);
};

const createOne = (newFilm: NewFilm): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);
    
    const existing = films.find((film) => 
        film.title.toLowerCase() === newFilm.title.toLocaleLowerCase() && 
        film.director.toLocaleLowerCase() === newFilm.director.toLocaleLowerCase());

    if(existing) {
        return undefined;
    }

    const film = {id : nextId(), ...newFilm};
    films.push(film);
    serialize(jsonDbPath, films);
    return film;
};

const deleteOne = (id: number): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);

    const index = films.findIndex(film => film.id === id);

    if(index === -1) {
        return undefined;
    }

    const [film] = films.splice(index, 1);
    serialize(jsonDbPath, films);
    return film;
};

const updateOne = (id: number, filmUpdate: Partial<NewFilm>): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);

    const index = films.findIndex(film => film.id === id);

    if(index === -1) {
        return undefined;
    }

    const film = {...films[index], ...filmUpdate};
    films[index] = film;
    serialize(jsonDbPath, films);
    return film;
};

const updateOrCreate = (id: number, filmUpdate: NewFilm): Film | undefined => {
    const films = parse(jsonDbPath, defaultFilms);

    const index = films.findIndex(film => film.id === id);

    if(index === -1) { 
        return createOne(filmUpdate);
    }

    const film = {...films[index], ...filmUpdate};
    films[index] = film;
    serialize(jsonDbPath, films);
    return film;
};

const nextId = (): number => {
    return parse(jsonDbPath, defaultFilms).reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;
};

export { readAll, readOne, createOne, deleteOne, updateOne, updateOrCreate };
