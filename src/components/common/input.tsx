import { ChangeEvent } from "react";

export interface InputProps {
  name: string;
  label: string;
  error: string;
}

const Input = ({
  name,
  label,
  error,
  ...rest
}: InputProps & { [key: string]: string | ((e: any) => void) }) => {
  const getClasses = (error: string) => (error ? "input is-danger" : "input");
  return (
    <>
      <div className="field">
        <input
          id={name}
          name={name}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={getClasses(error)}
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
