import path from "node:path";
import {Text , NewText} from "../types";
import {parse, serialize} from "../utils/json";
import { v4 as uuidv4 } from "uuid";


const jsonDbPath = path.join(__dirname, "/../data/texts.json");

const defaultTexts: Text[] = [
    {
        id: uuidv4(),
        content: "The quick brown fox jumps over the lazy dog",
        level: "easy"
    },
    {
        id: uuidv4(),
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        level: "medium"
    },
    {
        id: uuidv4(),
        content: "It is a truth universally acknowledged, that a single",
        level: "hard"
    },
    {
        id: uuidv4(),
        content: "Great power comes with great responsibility",
        level: "hard"
    }
];

const readAll = (level: string | undefined = undefined): Text[] => {
    const texts = parse(jsonDbPath, defaultTexts);

    return level ? texts.filter(text => text.level === level) : texts;
};

const readOne = (id: string): Text | undefined => {
    const texts = parse(jsonDbPath, defaultTexts);

    return texts.find(text => text.id === id);
};

const createOne = (newText: NewText): Text | undefined => {
    const texts = parse(jsonDbPath, defaultTexts);

    const existing = texts.find(text => 
        text.content.toLowerCase() === newText.content.toLowerCase() && 
        text.level.toLowerCase() === newText.level.toLowerCase());
    
    if(existing) {
        return undefined;
    }

    const text = {
        id: uuidv4(),
        ...newText
    };

    texts.push(text);
    serialize(jsonDbPath, texts);
    return text;
};

const deleteOne = (id: string): Text | undefined => {
    const texts = parse(jsonDbPath, defaultTexts);

    const index = texts.findIndex(text => text.id === id);

    if(index === -1) {
        return undefined;
    }

    const [text] = texts.splice(index, 1);
    serialize(jsonDbPath, texts);
    return text;
};

const updateOne = (id: string, textUpdate: Partial<NewText>): Text | undefined => {
    const texts = parse(jsonDbPath, defaultTexts);

    const index = texts.findIndex(text => text.id === id);

    if(index === -1) {
        return undefined;
    }

    const text = {
        ...texts[index],
        ...textUpdate
    };

    texts[index] = text;
    serialize(jsonDbPath, texts);
    return text;
};

export {readAll, readOne, createOne, deleteOne, updateOne};

