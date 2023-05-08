import { decode } from "@/util/jwt";
import { PrismaClient, User } from "@prisma/client";
import { cookies } from "next/headers";
import Image from "next/image";

const prisma = new PrismaClient();

type props = {};

const UserPanel = async (props: props) => {
  let cookie = cookies().get("user");
  let user: User | null = null;
  if (cookie) {
    user = decode(cookie!.value).payload as User;
  }

  if (user === null) {
    return (
      <div className="w-1/4 bg-transparent rounded-xl p-4 flex flex-col items-center"></div>
    );
  }

  const data = await prisma.user.findFirst({
    where: { username: user.username },
    include: {
      followers: true,
      following: true,
    },
  });

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
      <p className="text-center text-gray-400 text-sm">
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
    </div>
  );
};

export default UserPanel;
