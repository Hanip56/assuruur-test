import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, profile, visi, image, moreInfo, description } =
      await req.json();

    if (!image || !name || !profile || !visi || !description) {
      return new NextResponse("Required field is missing", { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let lembaga;

    try {
      lembaga = await db.lembaga.create({
        data: {
          name,
          profile,
          moreInfo,
          image,
          slug: slugify(name),
          visi,
          description,
        },
      });
    } catch (error) {
      await utapi.deleteFiles([image]);
      throw error;
    }

    return NextResponse.json(lembaga);
  } catch (error) {
    console.log("[POST_ARTICLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
