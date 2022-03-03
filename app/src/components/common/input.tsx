import { string } from 'joi';
import FieldErrorMessage, { FieldError } from './fieldError';

export interface InputProps {
  name: string;
  label: string;
  error: FieldError;
  className: string;
}

const Input = ({
  name,
  label,
  error,
  className,
  ...rest
}: InputProps & {
  [key: string]: string | FieldError | ((e: any) => void);
}) => {
  const getClasses = (error: FieldError, additionalClass: string) => {
    const inputClasses = `input ${additionalClass}`;
    return error ? `${inputClasses} is-danger` : inputClasses;
  };

  return (
    <>
      <div className='field'>
        <input
          id={name}
          name={name}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={getClasses(error, className)}
          {...rest}
        />
        <FieldErrorMessage error={error}></FieldErrorMessage>
      </div>
    </>
  );
};

export default Input;
