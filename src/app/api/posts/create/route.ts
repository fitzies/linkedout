import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body: { content: string; authorId: number; thing?: string } =
    await request.json();

  const res = await prisma.post.create({
    data: {
      content: body.content,
      authorId: body.authorId,
      thing: body.thing,
    },
  });

  return NextResponse.json(res);
}
