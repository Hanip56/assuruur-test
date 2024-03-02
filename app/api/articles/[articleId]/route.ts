import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

// update without new image
export async function PATCH(
  req: Request,
  { params }: { params: { articleId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const articleExist = await db.article.findUnique({
      where: {
        id: params.articleId,
      },
    });

    if (!articleExist) {
      return new NextResponse("Article not found", { status: 404 });
    }

    const oldImage = articleExist.image;
    const isImageChange = body?.image && oldImage !== body.image;

    console.log({ isImageChange });

    await db.$transaction([
      db.tagsOnArticles.deleteMany({
        where: {
          articleId: params.articleId,
        },
      }),
      db.tagsOnArticles.createMany({
        data: body.tags.map((tagId: string) => ({
          tagId,
          articleId: params.articleId,
        })),
      }),
    ]);

    await db.article.update({
      where: {
        id: params.articleId,
      },
      data: {
        title: body?.title,
        description: body?.description,
        content: body?.content,
        image: body?.image,
        categoryId: body?.category,
        slug: body.title ? slugify(body.title) : undefined,
        tags: undefined,
      },
    });

    if (isImageChange) {
      await utapi.deleteFiles([oldImage]);
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[ARTICLE_ID_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// delete article
export async function DELETE(
  req: Request,
  { params }: { params: { articleId: string } }
) {
  try {
    const session = auth();

    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const article = await db.article.findUnique({
      where: {
        id: params.articleId,
      },
    });

    if (!article)
      return new NextResponse("Article doesnt exist", { status: 404 });

    await db.tagsOnArticles.deleteMany({
      where: {
        articleId: params.articleId,
      },
    });

    await db.article.delete({
      where: {
        id: params.articleId,
      },
    });

    await utapi.deleteFiles(article.image);

    return NextResponse.json(`Article with id:${article.id} has been deleted`);
  } catch (error) {
    console.log("[ARTICLE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
