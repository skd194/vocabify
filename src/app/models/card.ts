import { Note } from "./Note";

export interface Card {
  id: number;
  name: string;
  notes: Note[];
}


