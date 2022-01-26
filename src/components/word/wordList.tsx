import { string } from "joi";
import { initial } from "lodash";
import * as React from "react";
import { IWord } from "./../../models/Word";

interface IWordListProps {
  words: IWord[];
}

function WordList({ words }: IWordListProps) {
  return (
    <>
      {words.map((word) => {
        return (
          <div>
            <span className="tag is-warning" style={{ fontSize: "0.8rem" }}>
              <strong
                className="content"
                style={{ fontStyle: "italic", fontFamily: "Cursive" }}
              >
                {word.word}
              </strong>
            </span>
            <em>
              {" "}
              <small>{word.definition[0]}</small>
            </em>
          </div>
        );
      })}
    </>
  );
}

export default WordList;
