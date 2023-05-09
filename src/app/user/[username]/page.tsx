import { headers } from "next/headers";
import { User, PrismaClient } from "@prisma/client";
import UserPanel from "@/components/UserPanel";
import Feed from "@/components/Feed";

const prisma = new PrismaClient();

const Page = async (searchParams: any) => {
  const user = await prisma.user.findFirst({
    where: { username: searchParams.params.username },
    include: {
      followers: true,
      following: true,
    },
  });

  const posts = await prisma.post.findMany({ where: { authorId: user?.id } });

  if (!user) {
    return <>User not found</>;
  }

  return (
    <div className="w-screen flex justify-center items-start p-4 gap-4">
      {/* @ts-ignore */}
      <UserPanel customUser={user} />
      {/* @ts-ignore */}
      <Feed customFeed={posts} />
      <div className="w-1/4 bg-transparent rounded-xl p-4 flex flex-col items-center"></div>
    </div>
  );
};

export default Page;
