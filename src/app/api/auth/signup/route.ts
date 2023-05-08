import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/util/hash";
import { createToken } from "@/util/jwt";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body: { email: string; username: string; password: string } =
    await req.json();

  const exists =
    !!(await prisma.user.findFirst({
      where: { username: body.username },
    })) ||
    !!(await prisma.user.findFirst({
      where: { email: body.email },
    }));

  if (exists) {
    return NextResponse.json(false);
  } else if (!exists) {
    const passwordHash = await hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: passwordHash,
      },
    });
    const token = createToken({
      email: body.email,
      username: body.username,
    });
    // @ts-ignore
    cookies().set("user", token);
    return NextResponse.json({ user: user });
  }
}
