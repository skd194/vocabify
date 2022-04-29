import * as React from "react";
import { ICard } from "../../models/card";
import NoteList from "../note/noteList";

interface CardProps {
  card: ICard;
}

const Card: React.FunctionComponent<CardProps> = ({
  card,
}: {
  card: ICard;
}) => {

  return (
    <div
      className="box"
      style={{ height: "80vh", overflowY: "scroll", paddingRight: "5px" }}
    >
      <h3>{card.name}</h3>
      <hr />
      <NoteList notes={card.notes}></NoteList>
    </div>
  );
};

export default Card;
