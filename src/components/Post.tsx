import { Post, PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

const timeDifference = (date: Date) => {
  const postCreatedAt = new Date(date);
  const timeDiffHours =
    Math.abs(new Date().getTime() - date.getTime()) / 1000 / 60 / 60;
  const result = `${Math.round(timeDiffHours)}h`;
  return result;
};

type props = {
  post: Post;
};

const Post = async (props: props) => {
  const { post } = props;

  const user = await prisma.user.findFirst({ where: { id: post.authorId } });

  if (!user || !post) {
    return <>Error loading post</>;
  }

  return (
    <div className="w-full bg-gray-800 rounded-xl border border-gray-700 p-4 flex flex-col">
      <div className="flex gap-2">
        <div className="w-1/12 aspect-square bg-black rounded-full">
          {user.avatar ? (
            <img
              alt="avatar"
              src={user.avatar}
              className="h-full w-full rounded-full"
            />
          ) : null}
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold">{user.username}</h1>
          <p className="text-sm text-gray-400">
            {timeDifference(post.createdAt)}
          </p>
        </div>
      </div>
      <div className="px-1 pt-2">{post.content}</div>
      {post.thing ? (
        <iframe
          src={post.thing}
          width="640"
          height="480"
          allow="autoplay"
          className="w-full px-2 my-2 rounded-3xl"
        ></iframe>
      ) : null}
      {/* {post.videoThing ? (
        <iframe
          src={post.videoThing}
          className="w-full px-2 my-2 rounded-3xl"
        />
      ) : null} */}
    </div>
  );
};

export default Post;
