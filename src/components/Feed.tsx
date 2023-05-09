import { cookies } from "next/headers";
import Write from "./Write";
import { decode } from "@/util/jwt";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import Post from "./Post";

const prisma = new PrismaClient();

type props = {
  customFeed?: Post[]; // Custom posts but can't post
  customUser: User; // Custom user but can still post
};

const Feed = async (props: props) => {
  let cookie = cookies().get("user");
  let user: User | null = null;
  if (cookie) {
    user = decode(cookie!.value).payload as User;
  }

  const data = await prisma.user.findFirst({
    where: { email: user?.email },
  });

  let posts = await (await prisma.post.findMany()).reverse();

  if (props.customFeed) {
    posts = props.customFeed;
    cookie = undefined;
  }

  if (props.customUser) {
    posts = await prisma.post.findMany({
      where: { authorId: props.customUser.id },
    });
  }

  if (posts.length <= 0) {
    return <>No posts...</>;
  }

  return (
    <div className="flex flex-col w-[40%] gap-2">
      {cookie && data ? <Write user={data} /> : null}
      {/* @ts-ignore */}
      {posts
        ? posts.map((post, i) => {
            // @ts-ignore
            return <Post post={post} key={i} />;
          })
        : "Loading posts..."}
    </div>
  );
};

export default Feed;
