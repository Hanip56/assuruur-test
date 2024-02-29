import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let isAdmin = false;

    const { username, email, body, userId, image, parentId, articleId } =
      await req.json();

    if (!username || !email || !body || !articleId)
      return new NextResponse("Required field is missing", { status: 400 });

    const articleExist = await db.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!articleExist)
      return new NextResponse("Informasi not found", { status: 404 });

    if (userId) {
      const userExist = await db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (userExist) {
        isAdmin = true;
      }
    }

    const comment = await db.comment.create({
      data: {
        body,
        username,
        email,
        articleId,
        userId,
        image,
        parentId,
        isApprove: isAdmin,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[COMMENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
