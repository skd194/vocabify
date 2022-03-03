import React, { Component } from 'react';
import Joi, { ObjectSchema } from 'joi';
import _ from 'lodash';
import Input from './input';
import TextArea from './textArea';
import { JsObject } from './types/Object';
import { FieldError } from './fieldError';

export interface IFormContent<
  TFormContent extends JsObject<string>,
  TFormState
> {
  data: TFormContent;
  formState: TFormState;
  errors: { [key: string]: FieldError };
}

abstract class Form<
  TProps,
  TFormContent extends JsObject<string>,
  TFormState
> extends Component<TProps, IFormContent<TFormContent, TFormState>> {
  constructor(
    props: TProps,
    initialFormContent: TFormContent,
    initialFormState: TFormState
  ) {
    super(props);
    this.state = {
      data: initialFormContent,
      errors: {},
      formState: initialFormState,
    };
  }

  state: IFormContent<TFormContent, TFormState>;
  abstract readonly schema: ObjectSchema<any>;
  abstract doSubmit(): void;

  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    return !error
      ? null
      : _.reduce(
          error.details,
          function (obj: { [key: string]: FieldError }, param) {
            const path = param.path[0];
            obj[path] = FieldError.Error(param.message);
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
    if (errorMessage) errors[target.name] = FieldError.Error(errorMessage);
    else delete errors[target.name];
    const data: TFormContent = { ...this.state.data };
    _.set(data, target.name, target.value);
    this.setState({ data, errors });
  };

  renderSubmitButton(label: string, className: string = '') {
    let buttonClassName = 'button';
    if (className) {
      buttonClassName += ` ${className}`;
    }
    return (
      <button className={buttonClassName} disabled={this.validate() !== null}>
        {label}
      </button>
    );
  }

  renderInput(
    name: string,
    label: string,
    type: string,
    className: string = ''
  ) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        error={errors[name]}
        type={type}
        value={data[name]}
        className={className}
        onChange={this.handleChange}
      ></Input>
    );
  }

  renderTextArea(name: string, label: string, className: string = '') {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        label={label}
        error={errors[name]}
        value={data[name]}
        className={className}
        onChange={this.handleChange}
      ></TextArea>
    );
  }

  getFieldError(name: string) {
    const error = this.state.errors[name];
    if (!error) return '';
    return error.message;
  }
}

export default Form;
