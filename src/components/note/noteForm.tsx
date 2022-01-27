import Joi from "joi";
import Icon from "@mdi/react";
import { mdiArrowRightCircle, mdiPlusCircle } from "@mdi/js";
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
    {
      id: "1",
      word: "cram",
      definition: [
        "completely fill (a place or container) to the point of overflowing  asjdhg jhasgd jhags jhdgajsdjhasgdjhg.",
      ],
    },
    { id: "3", word: "tread", definition: ["walk in a specified way."] },
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

  handleWordSection = (enable: boolean) => {
    this.setState({
      formState: { ...this.state.formState, addWordEnabled: enable },
    });
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
              "Add new word to dictionary",
              () => this.handleWordSection(true)
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
              this.handleWordSection(false)
            )}
          </div>
        </div>
        <div className="tile is-parent is-12 is-vertical">
          <div className="tile is-child">
            <WordForm
              data={WordFormContent.Empty}
              addWord={this.handleAddWord}
            ></WordForm>
          </div>
        </div>
      </>
    );
  }

  handleAddWord = (word: IWordFormContent): void => {
    const words = [...this.state.data.words];
    words.push({
      id: (Math.random() * -1).toString(),
      word: word.word,
      definition: [word.definition],
    });
    const data = { ...this.state.data, words };
    const formState = { ...this.state.formState, addWordEnabled: false };
    this.setState({ data, formState });
  };

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
