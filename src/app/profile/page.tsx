import Feed from "@/components/Feed";
import UserPanel from "@/components/UserPanel";
import { decode } from "@/util/jwt";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

const Page = async () => {
  let cookie = cookies().get("user");
  let user = null;
  if (cookie) {
    user = decode(cookie!.value).payload;
  }

  const data = await prisma.user.findFirst({
    where: { email: user?.email },
  });

  return (
    <div className="w-screen flex justify-center items-start p-4 gap-4">
      {/* @ts-expect-error Server Component */}
      <UserPanel editable />
      {/* @ts-expect-error Server Component */}
      <Feed customUser={data} />
      <div className="w-1/4 bg-transparent rounded-xl p-4 flex flex-col items-center"></div>
    </div>
  );
};

export default Page;
