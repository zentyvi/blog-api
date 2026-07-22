function FormInput({
  type = "text",
  name,
  id,
  value,
  onChange,
  isRequired,
  label,
  placeholder = "",
  error,
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required={isRequired}
        placeholder={placeholder}
      />
      {error ? <span>{error?.msg}</span> : null}
    </div>
  );
}

export default FormInput;
