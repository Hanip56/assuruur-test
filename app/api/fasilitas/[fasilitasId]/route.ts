import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { fasilitasId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const fasilitasExist = await db.fasilitas.findUnique({
      where: {
        id: params.fasilitasId,
      },
    });

    if (!fasilitasExist) {
      return new NextResponse("Fasilitas not found", { status: 404 });
    }

    const oldImage = fasilitasExist.image;
    const isImageChange = body?.image && oldImage !== body.image;

    await db.fasilitas.update({
      where: {
        id: params.fasilitasId,
      },
      data: {
        name: body?.name,
        description: body?.description,
        fasilitasTypeId: body?.type,
        slug: body.name ? slugify(body.name) : undefined,
        image: body?.image,
      },
    });

    if (isImageChange && oldImage) {
      await utapi.deleteFiles([oldImage]);
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[FASILITAS_ID_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { fasilitasId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    let fasilitas = await db.fasilitas.findUnique({
      where: { id: params.fasilitasId },
    });

    if (!fasilitas)
      return new NextResponse("Fasilitas doesn't exist", { status: 404 });

    await db.fasilitas.delete({
      where: {
        id: params.fasilitasId,
      },
    });

    return NextResponse.json({
      message: `Fasilitas with id: ${params.fasilitasId} has been deleted`,
    });
  } catch (error) {
    console.log("[FASILITAS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
