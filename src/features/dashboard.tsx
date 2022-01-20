import { mdiCardPlus } from "@mdi/js";
import Icon from "@mdi/react";
import * as React from "react";
import { ICard } from "../app/models/card";
import Card from "./card";

interface IDashboardProps {
  cards: ICard[];
}

function Dashboard({ cards }: IDashboardProps) {
  var a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 1111, 1, 1, 1, 1, 1, 1, 1,
  ];

  return (
    <React.Fragment>
      <div className="tile is-ancestor">
        <div className="tile is-2 box" style={{height: 500, overflow: "hidden", overflowY: "scroll"}}>
          <div className="tile is-child">
            <aside className="menu">
              <p className="menu-label">General</p>
              <ul className="menu-list">
                <li>
                  <button className="button">
                    <span className="icon">
                      <Icon
                        path={mdiCardPlus}
                        size={1}
                        horizontal
                        vertical
                        color="blue"
                      ></Icon>
                    </span>
                  </button>
                </li>
                <li>
                  <a>Customers</a>
                </li>
              </ul>
              <p className="menu-label">Administration</p>
              <ul className="menu-list">
                <li>
                  <a>Team Settings</a>
                </li>
                <li>
                  <a className="is-active">Manage Your Team</a>
                  <ul>
                    <li>
                      <a>Members</a>
                    </li>
                    <li>
                      <a>Plugins</a>
                    </li>
                    <li>
                      <a>Add a member</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Invitations</a>
                </li>
                <li>
                  <a>Cloud Storage Environment Settings</a>
                </li>
                <li>
                  <a>Authentication</a>
                </li>
              </ul>
              <p className="menu-label">Transactions</p>
              <ul className="menu-list">
                <li>
                  <a>Payments</a>
                </li>
                <li>
                  <a>Transfers</a>
                </li>
                <li>
                  <a>Balance</a>
                </li>
              </ul>
            </aside>
          </div>
        </div>

        <div className="tile is-parent is-6">
          <div className="tile is-child">
            <div className="columns">
              <div className="column is-full">
                <div className="box">
                  <h3>Friendly Conversation</h3>
                  <hr />
                  <ul></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <div className="columns">
              <div className="column is-full">
                {cards.map((card) => (
                  <Card card={card}></Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
