import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { images, at, title, description } = await req.json();

    if (images.length < 1) {
      return new NextResponse("images field is required", { status: 400 });
    }

    if (!at) {
      return new NextResponse("at field is required", { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let banner;

    try {
      banner = await db.banner.create({
        data: {
          at,
          title,
          description,
          images: {
            createMany: {
              data: images.map((key: any) => ({ key })),
            },
          },
        },
      });
    } catch (error) {
      // delete the uploaded files if db failed
      await utapi.deleteFiles(images.map((image: any) => image.key));
      throw error;
    }

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[POST_BANNER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
