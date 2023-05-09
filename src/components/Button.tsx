"use client";

import { useState } from "react";
import Loading from "./Loading";

type props = {
  text: string;
  type?: "solid" | "dashed" | "polished";
  onClick?: () => void;
  children?: any;
};

const Button = (props: props) => {
  const [isLoading, setIsLoading] = useState(false);

  const submit = () => {
    if (props.onClick) {
      props.onClick();
      setIsLoading(() => true);
    }
  };

  if (props.type === "dashed") {
    return (
      <div
        className="bg-slate-800 px-3 py-2 text-white font-bold rounded-lg w-full text-center cursor-pointer shadow-lg hover:bg-slate-700 duration-200"
        onClick={props.onClick}
      >
        {!isLoading ? props.children : <Loading />}
      </div>
    );
  }

  if (props.type === "polished") {
    return (
      <div
        className="bg-slate-700 px-3 py-2 text-white font-bold rounded-lg w-full text-center cursor-pointer shadow-lg hover:bg-slate-600 duration-200"
        onClick={submit}
      >
        {!isLoading ? props.text : <Loading />}
      </div>
    );
  }

  return (
    <div
      className="bg-gradient px-3 py-2 text-white font-bold rounded-lg w-full text-center cursor-pointer shadow-lg hover:-translate-y-1 duration-200"
      onClick={submit}
    >
      {!isLoading ? props.text : <Loading />}
    </div>
  );
};

export default Button;
