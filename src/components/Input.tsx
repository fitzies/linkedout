type props = {
  text: string;
  value: string;
  onChange: Function;
  type: "password" | "email" | "text";
  placeholder: string;
};

const Input = (props: props) => {
  return (
    <div className="flex flex-col w-full gap-3 my-3">
      <p>{props.text}</p>
      <input
        className="input"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e: any) => props.onChange(e)}
      />
    </div>
  );
};

export default Input;
