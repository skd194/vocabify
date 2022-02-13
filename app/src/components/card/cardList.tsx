import { mdiPlusCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import * as React from "react";

interface CardListProps {}

const CardList: React.FunctionComponent<CardListProps> = () => {
  return (
    <article className="panel" style={{height: "80vh"}}>
      <p className="panel-heading is-primary-bg">
        <h3 style={{ textAlign: "center", color: "white" }}>Cards</h3>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input is-warning"
            type="text"
            placeholder="Search"
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <a className="panel-block is-active">
        <button className="button is-rounded is-fullwidth">
          <span className="icon">
            <Icon
              path={mdiPlusCircleOutline}
              size={1}
              horizontal
              vertical
              color="darkorange"
            ></Icon>
          </span>
          <span>Add Card</span>
        </button>
      </a>
      <a className="panel-block is-active">
        <span className="panel-icon">
          <i className="fas fa-book" aria-hidden="true"></i>
        </span>
        bulma
      </a>
      <a className="panel-block">
        <span className="panel-icon">
          <i className="fas fa-book" aria-hidden="true"></i>
        </span>
        marksheet
      </a>
      <a className="panel-block">
        <span className="panel-icon">
          <i className="fas fa-book" aria-hidden="true"></i>
        </span>
        minireset.css
      </a>
      <a className="panel-block">
        <span className="panel-icon">
          <i className="fas fa-book" aria-hidden="true"></i>
        </span>
        jgthms.github.io
      </a>
    </article>
  );
};

export default CardList;
