import Joi from "joi";
import React from "react";
import Form from "../common/form";
import { JsObject } from "../common/types/Object";

export class WordFormContent implements IWordFormContent {
  constructor(public word: string, public definition: string) {}

  static Empty: WordFormContent = new WordFormContent(
    "New Word",
    "hello, I am new word"
  );
}

export interface IWordFormContent extends JsObject {
  word: string;
  definition: string;
}

interface WordFormProps {
  data: IWordFormContent;
  addWord: (word: IWordFormContent) => void;
}

class WordForm extends Form<WordFormProps, IWordFormContent, {}> {
  constructor(props: WordFormProps) {
    super(props, props.data, {});
  }

  schema = Joi.object({
    word: Joi.string().label("Word").required(),
    definition: Joi.string().label("Definition").required(),
  });

  doSubmit(): void {
    throw new Error("Method not implemented.");
  }

  render() {
    return (
      <>
        <div
          className="box-light"
          style={{ overflowX: "auto", overflowY: "hidden" }}
        >
          <h4>Add Word</h4>
          {this.renderInput("word", "Word", "text")}
          {this.renderTextArea("definition", "Definition")}
          <button
            type="button"
            className="button is-pulled-right is-rounded"
            onClick={() => this.props.addWord(this.state.data)}
            disabled={this.validate() !== null}
          >
            Add
          </button>
        </div>
      </>
    );
  }
}

export default WordForm;
