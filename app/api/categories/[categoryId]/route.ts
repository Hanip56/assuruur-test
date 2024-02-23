import { auth } from "@/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    const { name, description } = await req.json();

    let category = await db.category.findUnique({
      where: { id: params.categoryId },
    });

    if (!category)
      return new NextResponse("Category doesn't exist", { status: 404 });

    if (name) {
      category = await db.category.update({
        where: {
          id: params.categoryId,
        },
        data: {
          name,
          description,
          slug: slugify(name),
        },
      });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    let category = await db.category.findUnique({
      where: { id: params.categoryId },
    });

    if (!category)
      return new NextResponse("Category doesn't exist", { status: 404 });

    await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json({
      message: `Category with id: ${params.categoryId} has been deleted`,
    });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
