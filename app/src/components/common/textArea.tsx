import FieldErrorMessage, { FieldError } from './fieldError';

export interface TextAreaProps {
  name: string;
  label: string;
  error: FieldError;
  className: string;
}

const TextArea = ({
  name,
  label,
  error,
  className,
  ...rest
}: TextAreaProps & {
  [key: string]: string | FieldError | ((e: any) => void);
}) => {
  const getClasses = (error: FieldError, additionalClass: string) => {
    const textAreaClass = `textarea ${additionalClass}`;
    return error ? `${textAreaClass} is-danger` : textAreaClass;
  };

  return (
    <div className='field'>
      <div className='control'>
        <textarea
          id={name}
          name={name}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={getClasses(error, className)}
          {...rest}
        />
        <FieldErrorMessage error={error}></FieldErrorMessage>
      </div>
    </div>
  );
};

export default TextArea;
