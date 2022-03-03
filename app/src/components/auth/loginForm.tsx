import { Axios, AxiosError } from 'axios';
import Joi from 'joi';
import { toast } from 'react-toastify';
import Form from '../common/form';
import { FieldError } from "../common/fieldError";
import auth from './../../services/auth/authService';
import * as models from './models';

class LoginForm extends Form<
  models.LoginFormProps,
  models.ILoginFormContent,
  {}
> {
  constructor() {
    super({}, new models.LoginFormContent(), {});
  }

  schema = Joi.object({
    username: Joi.string().label('Username').required(),
    password: Joi.string().label('Password').required(),
  });

  async doSubmit() {
    const { username, password } = this.state.data;
    try {
      await auth.login({ username, password });
    } catch (ex: any) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.username = FieldError.FlagError;
        errors.password = FieldError.Error('please check your credentials');
        this.setState({ errors });
      }
    }
  }

  render() {
    return (
      <>
        <form
          className='box'
          style={{ overflowX: 'auto', overflowY: 'hidden' }}
          onSubmit={this.handleSubmit}
        >
          <h4 className='title is-4'>Login</h4>
          {this.renderInput('username', 'Username', 'text')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderSubmitButton('Login', 'is-pulled-right')}
        </form>
      </>
    );
  }
}

export default LoginForm;
