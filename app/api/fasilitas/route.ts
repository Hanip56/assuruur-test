import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, description, type, image } = await req.json();

    if (!image || !name || !description || !type) {
      return new NextResponse("Required field is missing", { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let fasilitas;

    try {
      fasilitas = await db.fasilitas.create({
        data: {
          name,
          description,
          fasilitasTypeId: type,
          image,
          slug: slugify(name),
        },
      });
    } catch (error) {
      await utapi.deleteFiles([image]);
      throw error;
    }

    return NextResponse.json(fasilitas);
  } catch (error) {
    console.log("[FAILITAS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
