import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const commentExist = await db.comment.findUnique({
      where: {
        id: params.commentId,
      },
    });

    if (!commentExist) {
      return new NextResponse("Comment not found", { status: 404 });
    }

    await db.comment.update({
      where: {
        id: params.commentId,
      },
      data: body,
    });

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[COMMENT_ID_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
