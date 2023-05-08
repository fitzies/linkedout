"use client";

import { User, PrismaClient } from "@prisma/client";
import Button from "./Button";
import { FaImage, FaVideo, FaFileAlt, FaHashtag, FaAt } from "react-icons/fa";
import { useState } from "react";
import FileDrop from "./FileDrop";

const submit = async (data: {
  content: string;
  authorId: number;
  thing: string | null;
}) => {
  const res = await fetch(
    `${process.env.URL || "https://linkedout-app.vercel.app"}/api/posts/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const response = await res.json();
  console.log(data);

  localStorage.removeItem("file");
  location.reload();
  return response;
};

type props = {
  user: User;
};

const Write = (props: props) => {
  const [content, setContent] = useState("");
  const [isDroppingFile, setIsDroppingFile] = useState(false);

  const actions = [
    {
      icon: <FaImage />,
      action: () => {
        setIsDroppingFile(() => true);
      },
    },
    {
      icon: <FaVideo />,
      action: () => {
        setIsDroppingFile(() => true);
      },
    },
    {
      icon: <FaHashtag />,
      action: () => {
        setContent((prev) => prev + "#");
      },
    },
    {
      icon: <FaAt />,
      action: () => {
        setContent((prev) => prev + "@");
      },
    },
  ];

  return (
    <div className="w-full bg-gray-800 rounded-xl border border-gray-700 p-4 flex flex-col">
      {isDroppingFile ? <FileDrop /> : null}
      <textarea
        className="input w-full resize-none"
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(() => e.target.value)}
      />
      <div className="w-full flex justify-between p-1">
        <div className="flex items-center text-lg gap-3">
          {actions.map((action, i) => (
            <div
              className="bg-slate-700 p-2 bg-opacity-50 rounded-2xl hover:bg-slate-600 duration-150 cursor-pointer"
              onClick={action.action}
              key={i}
            >
              {action.icon}
            </div>
          ))}
        </div>
        <div className="w-1/4">
          <Button
            text="Post"
            onClick={() =>
              submit({
                content: content,
                authorId: props.user.id,
                thing: localStorage.getItem("file"),
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Write;
