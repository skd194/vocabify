import Joi from "joi";
import Icon from "@mdi/react";
import {
  mdiArrowBottomLeftBoldBoxOutline,
  mdiArrowLeft,
  mdiArrowRight,
  mdiArrowRightCircle,
  mdiArrowUUpLeftBold,
  mdiPlus,
  mdiPlusBox,
  mdiPlusCircle,
} from "@mdi/js";
import Form from "../common/form";
import React, { Component } from "react";
import { JsObject } from "../common/types/Object";
import WordForm, {
  IWordFormContent,
  WordFormContent,
} from "./../word/wordForm";

import { IWord } from "./../../models/Word";
import WordList from "./../word/wordList";

interface NoteFormProps {
  data: INoteFormContent;
}

export interface INoteFormContent extends JsObject {
  id: string;
  content: string;
  words: IWord[];
}

export class NoteFormContent implements INoteFormContent {
  constructor(
    public id: string,
    public content: string,
    public words: IWord[]
  ) {}

  static Empty = new NoteFormContent("", "", [
    { word: "cram", definition: ["completely fill (a place or container) to the point of overflowing  asjdhg jhasgd jhags jhdgajsdjhasgdjhg."] },
    { word: "tread", definition: ["walk in a specified way."] },
  ]);
}

class NoteFormState {
  constructor(public addWordEnabled: boolean) {}

  static InitialState: NoteFormState = new NoteFormState(false);
}

class NoteForm extends Form<NoteFormProps, INoteFormContent, NoteFormState> {
  constructor(props: NoteFormProps) {
    super(props, props.data, NoteFormState.InitialState);
  }

  schema = Joi.object({
    id: Joi.string(),
    content: Joi.string().required().label("Note"),
    words: Joi.array().required(),
  });

  handleAddWord = (enable: boolean) => {
    const formState = { ...this.state.formState };
    formState.addWordEnabled = enable;
    this.setState({ formState });
  };

  doSubmit(): void {
    throw new Error("Method not implemented.");
  }

  renderFooterButton() {
    return !this.state.formState.addWordEnabled ? (
      <footer className="card-footer">
        <a href="#" className="card-footer-item">
          Clear
        </a>
        <a href="#" className="card-footer-item">
          Save
        </a>
      </footer>
    ) : null;
  }

  renderButtonWithIcon(
    iconPath: string,
    buttonText: string,
    onClick: () => void
  ) {
    return (
      <button
        className="button is-fullwidth is-rounded"
        onClick={onClick}
        type="button"
      >
        <span className="icon">
          <Icon
            path={iconPath}
            size={1}
            horizontal
            vertical
            color="darkorange"
          ></Icon>
        </span>
        <span>{buttonText}</span>
      </button>
    );
  }

  renderWords() {
    const { words } = this.state.data;
    return (
      <>
        <div className="tile is-parent is-12">
          <div className="tile is-child">
            {this.renderButtonWithIcon(
              mdiPlusCircle,
              "Add word to dictionary",
              () => this.handleAddWord(true)
            )}
          </div>
        </div>
        <div className="tile is-parent is-12 is-vertical">
          <div className="tile is-child">
            <WordList words={words}></WordList>
          </div>
        </div>
      </>
    );
  }

  renderAddWordSection() {
    return (
      <>
        <div className="tile is-parent is-12">
          <div className="tile is-child">
            {this.renderButtonWithIcon(mdiArrowRightCircle, "Back", () =>
              this.handleAddWord(false)
            )}
          </div>
        </div>
        <div className="tile is-parent is-12 is-vertical">
          <div className="tile is-child">
            <WordForm data={WordFormContent.Empty} onAddNote={hand} ></WordForm>
          </div>
        </div>
      </>
    );
  }

  handleAdd

  renderWordSection() {
    return this.state.formState.addWordEnabled
      ? this.renderAddWordSection()
      : this.renderWords();
  }

  render() {
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
                      {this.renderTextArea("content", "Note", "is-large")}
                    </div>
                  </div>
                  {this.renderWordSection()}
                </div>
              </form>
            </div>
          </div>
          {this.renderFooterButton()}
        </div>
      </div>
    );
  }
}

export default NoteForm;
