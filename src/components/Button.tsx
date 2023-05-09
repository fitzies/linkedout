"use client";

type props = {
  text: string;
  type?: "solid" | "dashed" | "polished";
  onClick?: () => void;
  children?: any;
};

const Button = (props: props) => {
  if (props.type === "dashed") {
    return (
      <div
        className="bg-slate-800 px-3 py-2 text-white font-bold rounded-lg w-full text-center cursor-pointer shadow-lg hover:bg-slate-700 duration-200"
        onClick={props.onClick}
      >
        {/* {props.text} */}
        {props.children}
      </div>
    );
  }

  if (props.type === "polished") {
    return (
      <div
        className="bg-slate-700 px-3 py-2 text-white font-bold rounded-lg w-full text-center cursor-pointer shadow-lg hover:bg-slate-600 duration-200"
        onClick={props.onClick}
      >
        {props.text}
      </div>
    );
  }

  return (
    <div
      className="bg-gradient px-3 py-2 text-white font-bold rounded-lg w-full text-center cursor-pointer shadow-lg hover:-translate-y-1 duration-200"
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
};

export default Button;
