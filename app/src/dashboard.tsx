import { mdiCardPlus } from "@mdi/js";
import Icon from "@mdi/react";
import * as React from "react";
import { ICard } from "./models/card";
import NoteForm, { NoteFormContent } from "./components/note/noteForm";
import NoteList from "./components/note/noteList";
import Card from "./components/card/card";
import CardList from "./components/card/cardList";

interface IDashboardProps {
  cards: ICard[];
}

function Dashboard({ cards }: IDashboardProps) {
  var a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 1111, 1, 1, 1, 1, 1, 1, 1,
  ];

  return (
    <>
      <div className="tile is-ancestor">
      
        <div className="tile is-parent is-2">
          <div className="tile is-child">
            <div className="columns">
              <div className="column is-full">
                <CardList></CardList>
              </div>
            </div>
          </div>
        </div>
       
        <div className="tile is-parent is-6">
          <div className="tile is-child">
            <div className="columns">
              <div className="column is-full">
                <Card card={cards[0]}></Card>
              </div>
            </div>
          </div>
        </div>
        
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <div className="columns">
              <div className="column is-full">
                <NoteForm data={NoteFormContent.Empty}></NoteForm>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Dashboard;
