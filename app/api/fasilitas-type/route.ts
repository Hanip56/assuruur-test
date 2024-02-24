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

    const fasilitasTypeExist = await db.fasilitasType.findUnique({
      where: { name },
    });

    console.log({ fasilitasTypeExist });

    if (fasilitasTypeExist)
      return new NextResponse("Fasilitas Type already exist", { status: 409 });

    const fasilitasType = await db.fasilitasType.create({
      data: {
        name,
        slug: slugify(name),
      },
    });

    return NextResponse.json(fasilitasType);
  } catch (error) {
    console.log("[FASILITAS_TYPE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
