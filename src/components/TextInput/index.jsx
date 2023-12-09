import "./styles.css";

export const Input = ({ onChange, value }) => {
  return (
    <input
      className="text-input"
      type="search"
      onChange={onChange}
      value={value}
      placeholder="Type your search"
    />
  );
};
