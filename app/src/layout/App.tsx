import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import Dashboard from "../dashboard";
import Users from "../hooks/Users";
import { ICard } from "../models/card";
import NavBar from "./NavBar";

function App() {
  // const [cards, setCards] = useState<ICard[]>([]);

  const cards: ICard[] = [
    {
      id: 25,
      name: "General ....",
      notes: [
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
                word: "cram",
                definition: ["to fit in tight"],
              },
            ],
          },
        },
        {
          id: 5666,
          content: "Hello how are you",
          wordbook: {
            id: 25,
            words: [
              {
                id: "dasd",
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
      <ToastContainer/>
      <div className="container" style={{ marginTop: 30 }}>
        <Dashboard cards={cards}></Dashboard>
        {/* <Users></Users> */}
      </div>
    </>
  );
}

export default App;