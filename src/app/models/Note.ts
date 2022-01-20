import { WordBook } from "./WordBook";


export interface Note {
  id: number;
  content: string;
  wordbook: WordBook[];
}
