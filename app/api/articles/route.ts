import { auth } from "@/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    const { name, description } = await req.json();

    if (!name)
      return new NextResponse("Name field is required", { status: 400 });

    const categoryExist = await db.category.findUnique({
      where: { name },
    });

    console.log({ categoryExist });

    if (categoryExist)
      return new NextResponse("Category already exist", { status: 409 });

    const category = await db.category.create({
      data: {
        name,
        description,
        slug: slugify(name),
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
