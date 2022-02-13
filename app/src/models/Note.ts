import { IWordBook } from "./WordBook";
export interface INote {
  id: number;
  content: string;
  wordbook: IWordBook;
}
