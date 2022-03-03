import { FunctionComponent } from 'react';

export class FieldError {
  public static get None(): FieldError {
    return new FieldError('', false);
  }

  public static get FlagError(): FieldError {
    return new FieldError('', true);
  }

  public static Error(message: string): FieldError {
    return new FieldError(message, true);
  }
  message: string;
  flagError: boolean;

  private constructor(message: string, flagError: boolean) {
    this.message = message;
    this.flagError = flagError;
  }
}

interface FieldErrorProps {
  error: FieldError;
}

const FieldErrorMessage: FunctionComponent<FieldErrorProps> = ({ error }) => {
  return error && error.message ? (
    <div style={{ color: 'red', marginTop: 0, fontStyle: 'italic' }}>
      {<small>{error.message}</small>}
    </div>
  ) : (
    <></>
  );
};

export default FieldErrorMessage;
