import Joi from "joi";
import React, { Component } from "react";
import Form from "../common/form";
import { JsObject } from "../common/types/Object";

export class WordFormContent implements IWordFormContent {
  constructor(public word: string, public definition: string) {}

  static Empty: WordFormContent = new WordFormContent("", "");
}

export interface IWordFormContent extends JsObject {
  word: string;
  definition: string;
}

interface WordFormProps {
  data: IWordFormContent;
  addWord: () => void
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
      <div className="box">
        <form>
          {this.renderInput("word", "Word", "text")}
          {this.renderTextArea("definition", "Definition", "is-medium")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default WordForm;
