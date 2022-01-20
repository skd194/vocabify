import React, { Fragment, useState } from "react";
import Dashboard from "../../features/dashboard";
import Users from "../../hooks/Users";
import { ICard } from "../models/card";
import NavBar from "./NavBar";

function App() {
  // const [cards, setCards] = useState<ICard[]>([]);

  const cards: ICard[] = [
    {
      id: 25,
      name: "General sentences",
      notes: [
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <>
      <NavBar></NavBar>
      <div className="container" style={{ marginTop: 30 }}>
        <Dashboard cards={cards}></Dashboard>
        <Users></Users>
      </div>
    </>
  );
}

export default App;
