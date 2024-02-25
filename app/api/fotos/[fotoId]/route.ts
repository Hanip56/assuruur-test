import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { fotoId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const fotoExist = await db.foto.findUnique({
      where: {
        id: params.fotoId,
      },
    });

    if (!fotoExist) {
      return new NextResponse("Foto not found", { status: 404 });
    }

    const oldImage = fotoExist.image;
    const isImageChange = body?.image && oldImage !== body.image;

    await db.foto.update({
      where: {
        id: params.fotoId,
      },
      data: {
        description: body?.description,
        image: body?.image,
        width: body?.width,
        height: body?.height,
      },
    });

    if (isImageChange && oldImage) {
      await utapi.deleteFiles([oldImage]);
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[FOTO_ID_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { fotoId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    let foto = await db.foto.findUnique({
      where: { id: params.fotoId },
    });

    if (!foto) return new NextResponse("Foto doesn't exist", { status: 404 });

    await db.foto.delete({
      where: {
        id: params.fotoId,
      },
    });

    return NextResponse.json({
      message: `Foto with id: ${params.fotoId} has been deleted`,
    });
  } catch (error) {
    console.log("[FOTO_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
