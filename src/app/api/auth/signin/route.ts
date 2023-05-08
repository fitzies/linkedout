import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "@/util/hash";
import { createToken } from "@/util/jwt";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body: { email: string; password: string } = await req.json();

  const user = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (!user) {
    return NextResponse.json(false);
  }

  const verifiedPassword = await verifyPassword(body.password, user?.password);
  if (!verifiedPassword) {
    return NextResponse.json(false);
  }

  const token = createToken({
    email: user.email,
    username: user.username,
  });
  // @ts-ignore
  cookies().set("user", token);
  return NextResponse.json({ user: user });
}
