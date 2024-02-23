import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image, title, content, category, tags } = await req.json();

    if (!image || !title || !content || !category || !tags) {
      return new NextResponse("Required field is missing", { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let article;

    try {
      article = await db.article.create({
        data: {
          title,
          content,
          image,
          userId: session.user.id,
          categoryId: category,
          slug: slugify(title),
          tags: {
            createMany: {
              data: tags.map((tagId: string) => ({ tagId })),
            },
          },
        },
      });
    } catch (error) {
      // delete the uploaded files if db failed
      await utapi.deleteFiles([image]);
      throw error;
    }

    return NextResponse.json(article);
  } catch (error) {
    console.log("[POST_ARTICLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
