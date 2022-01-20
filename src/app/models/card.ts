import { INote } from "./Note";

export interface ICard {
  id: number;
  name: string;
  notes: INote[];
}


