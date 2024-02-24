import { auth } from "@/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { fasilitasTypeId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    const { name } = await req.json();

    let fasilitasType = await db.fasilitasType.findUnique({
      where: { id: params.fasilitasTypeId },
    });

    if (!fasilitasType)
      return new NextResponse("Fasilitas Type doesn't exist", { status: 404 });

    if (name) {
      fasilitasType = await db.fasilitasType.update({
        where: {
          id: params.fasilitasTypeId,
        },
        data: {
          name,
          slug: slugify(name),
        },
      });
    }

    return NextResponse.json(fasilitasType);
  } catch (error) {
    console.log("[FASILITAS_TYPE_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { fasilitasTypeId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    let fasilitasType = await db.fasilitasType.findUnique({
      where: { id: params.fasilitasTypeId },
    });

    if (!fasilitasType)
      return new NextResponse("Fasilitas Type doesn't exist", { status: 404 });

    await db.fasilitasType.delete({
      where: {
        id: params.fasilitasTypeId,
      },
    });

    return NextResponse.json({
      message: `Fasilitas Type with id: ${params.fasilitasTypeId} has been deleted`,
    });
  } catch (error) {
    console.log("[FASILITAS_TYPE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
