import { auth } from "@/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    const { name } = await req.json();

    let tag = await db.tag.findUnique({
      where: { id: params.tagId },
    });

    if (!tag) return new NextResponse("Tag doesn't exist", { status: 404 });

    if (name) {
      tag = await db.tag.update({
        where: {
          id: params.tagId,
        },
        data: {
          name,
          slug: slugify(name),
        },
      });
    }

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[TAG_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    let tag = await db.tag.findUnique({
      where: { id: params.tagId },
    });

    if (!tag) return new NextResponse("Tag doesn't exist", { status: 404 });

    await db.tag.delete({
      where: {
        id: params.tagId,
      },
    });

    return NextResponse.json({
      message: `Tag with id: ${params.tagId} has been deleted`,
    });
  } catch (error) {
    console.log("[TAG_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
