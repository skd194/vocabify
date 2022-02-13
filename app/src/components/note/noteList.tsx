import * as React from "react";
import { INote } from "../../models/Note";

interface NoteListProps {
  notes: INote[];
}

const NoteList: React.FunctionComponent<NoteListProps> = ({ notes }) => {
  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li>
            <div className="box-light">{note.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
