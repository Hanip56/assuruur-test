import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { description, image, width, height } = await req.json();

    if (!image || !width || !description || !height) {
      return new NextResponse("Required field is missing", { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let foto;

    try {
      foto = await db.foto.create({
        data: {
          image,
          description,
          width,
          height,
        },
      });
    } catch (error) {
      await utapi.deleteFiles([image]);
      throw error;
    }

    return NextResponse.json(foto);
  } catch (error) {
    console.log("[FOTOS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
