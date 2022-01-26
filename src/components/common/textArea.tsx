export interface TextAreaProps {
  name: string;
  label: string;
  error: string;
  className: string;
}

const TextArea = ({
  name,
  label,
  error,
  className,
  ...rest
}: TextAreaProps & { [key: string]: string | ((e: any) => void) }) => {
  const getClasses = (error: string, additionalClass: string) => {
    const textAreaClass = `textarea ${additionalClass}`;
    return error ? `${textAreaClass} is-danger` : textAreaClass;
  };

  return (
    <div className="field">
      <div className="control">
        <textarea
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
    </div>
  );
};

export default TextArea;
