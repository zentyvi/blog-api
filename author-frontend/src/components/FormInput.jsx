import style from "../styles/components/FormInput.module.css";

function FormInput({
  type = "text",
  name,
  id,
  value,
  onChange,
  isRequired,
  label = false,
  placeholder = "",
  cols = 30,
  rows = 5,
  error,
}) {
  const inputClassName = `${style["input-field"]} ${
    error ? style["input-field--error"] : ""
  }`;

  return (
    <div className={style["input-wrapper"]}>
      {label && (
        <label htmlFor={id} className={style["input-label"]}>
          {label}{" "}
          {isRequired && <span className={style["input-required"]}>*</span>}
        </label>
      )}

      {type !== "textarea" ? (
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          required={isRequired}
          placeholder={placeholder}
          className={inputClassName}
        />
      ) : (
        <textarea
          name={name}
          id={id}
          onChange={onChange}
          required={isRequired}
          placeholder={placeholder}
          cols={cols}
          rows={rows}
          value={value}
          className={`${inputClassName} ${style["input-field--textarea"]}`}
        ></textarea>
      )}

      {error ? (
        <span className={style["input-error-msg"]}>{error?.msg}</span>
      ) : null}
    </div>
  );
}

export default FormInput;
