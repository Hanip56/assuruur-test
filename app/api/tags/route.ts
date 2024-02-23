import { auth } from "@/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    const { name } = await req.json();

    if (!name)
      return new NextResponse("Name field is required", { status: 400 });

    const tagExist = await db.tag.findUnique({
      where: { name },
    });

    console.log({ tagExist });

    if (tagExist) return new NextResponse("Tag already exist", { status: 409 });

    const tag = await db.tag.create({
      data: {
        name,
        slug: slugify(name),
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[TAG_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
