import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import * as React from "react";
import { ICard } from "../app/models/card";

interface ICardProps {
  card: ICard;
}

function Card({ card }: ICardProps) {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h3>Add Note</h3>
            <form>
              <div className="tile is-ancestor is-vertical">
                <div className="tile is-parent is-12 ">
                  <div className="tile is-child">
                    <div className="field">
                      <textarea
                        className="textarea is-large"
                        placeholder="Enter Note"
                      />
                    </div>
                  </div>
                </div>

                <div className="tile is-parent is-12">
                  <div className="tile is-child">
                    <button className="button is-fullwidth">
                      <span className="icon">
                        <Icon
                          path={mdiPlus}
                          size={1}
                          horizontal
                          vertical
                          color="blue"
                        ></Icon>
                      </span>
                      <span>Add word to dictionary</span>
                    </button>
                  </div>
                </div>

                <div className="tile box">
                  <div className="tile is-parent is-12 is-vertical">
                    <div className="tile is-child">
                      <div className="field">
                        <input className="input" placeholder="Enter word" />
                      </div>
                    </div>
                    <div className="tile is-child">
                      <div className="field">
                        <textarea
                          className="textarea is-small"
                          placeholder="Enter definition"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            Clear
          </a>
          <a href="#" className="card-footer-item">
            Save
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Card;
