import { decode } from "@/util/jwt";
import { Follows, PrismaClient, User } from "@prisma/client";
import { cookies } from "next/headers";
import Image from "next/image";
import Button from "./Button";

const prisma = new PrismaClient();

type props = {
  customUser?:
    | (User & {
        followers: Follows[];
        following: Follows[];
      })
    | null;
  editable?: boolean;
};

const UserPanel = async (props: props) => {
  let cookie = cookies().get("user");
  let user: User | null = null;
  if (cookie) {
    user = decode(cookie!.value).payload as User;
  }

  let data;

  if (user === null && !props.customUser) {
    return (
      <div className="w-1/4 bg-transparent rounded-xl p-4 flex flex-col items-center"></div>
    );
  }

  if (user && !props.customUser) {
    data = await prisma.user.findFirst({
      where: { username: user!.username },
      include: {
        followers: true,
        following: true,
      },
    });
  }

  if (props.customUser) {
    data = props.customUser;
  }

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-1/4 bg-gray-800 rounded-xl border border-gray-700 p-4 flex flex-col items-center">
      <div className="w-1/3 aspect-square bg-black rounded-full">
        {data.avatar ? (
          <Image
            alt="avatar"
            src={data.avatar}
            className="w-full rounded-full"
          />
        ) : null}
      </div>
      <h1 className="font-bold text-2xl my-4">{data.username}</h1>
      <p
        className={`text-center text-gray-400 text-sm ${
          props.editable ? "hover:underline cursor-pointer" : ""
        }`}
      >
        {data.bio ??
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, fugit!"}
      </p>
      <div className="flex gap-6 my-2">
        {[
          { name: "Followers", count: data.followers.length },
          { name: "Following", count: data.following.length },
        ].map((i) => {
          return (
            <div className="flex flex-col items-center" key={i.name}>
              <p>{i.count}</p>
              <p className="text-sm">{i.name}</p>
            </div>
          );
        })}
      </div>
      {props.customUser ? (
        <div className="p-4 flex gap-3">
          <Button text="Employ" />
          <Button text="Contact" type="polished" />
        </div>
      ) : null}
    </div>
  );
};

export default UserPanel;
