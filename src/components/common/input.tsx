import { ChangeEvent } from "react";

export interface InputProps {
  name: string;
  label: string;
  error: string;
  className: string;
}

const Input = ({
  name,
  label,
  error,
  className,
  ...rest
}: InputProps & { [key: string]: string | ((e: any) => void) }) => {
  const getClasses = (error: string, additionalClass: string) => {
    const inputClasses = `input ${additionalClass}`;
    return error ? `${inputClasses} is-danger` : inputClasses;
  };

  return (
    <>
      <div className="field">
        <input
          id={name}
          name={name}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={getClasses(error, className)}
          {...rest}
        />
        {error && (
          <div style={{ color: "red", marginTop: 0, fontStyle: "italic" }}>
            <small>{error}</small>
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
