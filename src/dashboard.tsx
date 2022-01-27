import { mdiCardPlus } from "@mdi/js";
import Icon from "@mdi/react";
import * as React from "react";
import { ICard } from "./models/card";
import NoteForm, { NoteFormContent } from "./components/note/noteForm";

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
        <div
          className="tile is-2 box"
          style={{ height: "90vh", overflow: "auto", overflowY: "scroll" }}
        >
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
                <div className="box" style={{height: "80vh", overflowY:"scroll"}}>
                  <h3>Friendly Conversation</h3>
                  <hr />
                  <ul>
                    <li>
                      <div className="box-light">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Doloremque magni repellat pariatur ullam quibusdam
                        id iure hic unde molestiae possimus autem accusamus
                        officiis error repudiandae, totam consequatur architecto
                        reprehenderit temporibus.
                      </div>
                    </li>
                    <li>
                      <div className="box-light">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Vel, provident commodi. Error, eaque? Nihil,
                        quidem voluptatum doloremque voluptates ipsum explicabo
                        expedita impedit delectus tempore adipisci earum illo
                        quasi. Corporis alias eaque sequi totam, sint enim! Sit
                        debitis adipisci distinctio est facere, corporis quo
                        possimus non dolore rerum, totam error ratione!
                      </div>
                    </li>
                    <li>
                      <div className="box-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt, quidem.
                      </div>
                    </li>
                    <li>
                      <div className="box-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt, quidem.
                      </div>
                    </li>
                    <li>
                      <div className="box-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt, quidem.
                      </div>
                    </li>
                    <li>
                      <div className="box-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt, quidem.
                      </div>
                    </li>
                    <li>
                      <div className="box-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt, quidem.
                      </div>
                    </li>
                    <li>
                      <div className="box-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt, quidem.
                      </div>
                    </li>
                    <li>
                      <div className="box-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sunt, quidem.
                      </div>
                    </li>
                  </ul>
                </div>
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
