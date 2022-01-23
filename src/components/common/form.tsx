import React, { Component } from "react";
import Joi, { ObjectSchema } from "joi";
import _ from "lodash";
import Input from "./input";

export interface IFormContent {
  data: { [key: string]: any };
  errors: { [key: string]: string };
}

abstract class Form<P> extends Component<P, IFormContent> {
  state: IFormContent;

  constructor(props: P) {
    super(props);
    this.state = { data: {}, errors: {} };
  }

  abstract readonly schema: ObjectSchema<any>;
  abstract doSubmit(): void;

  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    return !error
      ? null
      : _.reduce(
          error.details,
          function (obj: { [key: string]: string }, param) {
            const path = param.path[0];
            obj[path] = param.message;
            return obj;
          },
          {}
        );
  };

  validateProperty = ({
    name,
    value,
  }: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    const obj = { [name]: value };
    const schema = Joi.compile({ [name]: this.schema.extract(name) });
    const { error } = schema.validate(obj);
    return !error ? null : error.details[0].message;
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({
    currentTarget: target,
  }: {
    currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(target);
    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];
    const data: { [key: string]: string } = { ...this.state.data };
    data[target.name] = target.value;
    this.setState({ data, errors });
  };

  renderButton(label: string) {
    return (
      <button className="btn btn-primary" disabled={this.validate() !== null}>
        {label}
      </button>
    );
  }

  renderInput(name: string, label: string, type: string) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        error={errors[name]}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
      ></Input>
    );
  }
}

export default Form;
