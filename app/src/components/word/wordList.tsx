import * as React from "react";
import { IWord } from "./../../models/Word";

interface IWordListProps {
  words: IWord[];
}

function WordList({ words }: IWordListProps) {
  return (
    <div
      style={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "25vh" }}
    >
      {words.map((word) => {
        return (
          <div key={word.id} className="mt-1">
            <span
              className="tag is-warning has-tooltip-right has-tooltip-multiline has-tooltip-info has-tooltip-fade has-tooltip-arrow"
              data-tooltip={word.word}
            >
              <span className="label-06">{word.word}</span>
            </span>
            <em>
              {" "}
              <small>{word.definition[0]}</small>
            </em>
          </div>
        );
      })}
    </div>
  );
}

export default WordList;
