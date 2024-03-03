import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    const bannerExist = await db.banner.findUnique({
      where: {
        id: params.bannerId,
      },
      include: {
        images: true,
      },
    });

    if (!bannerExist) {
      return new NextResponse("Banner not found", { status: 404 });
    }

    return NextResponse.json(bannerExist);
  } catch (error) {
    console.log("[BANNER_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// update without new image
export async function PATCH(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const bannerExist = await db.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    });

    if (!bannerExist) {
      return new NextResponse("Banner not found", { status: 404 });
    }

    // Check if there is any deleted image
    if (body.deleteImages) {
      await db.$transaction([
        db.banner.update({
          where: {
            id: params.bannerId,
          },
          data: {
            ...body,
            images: undefined,
            deleteImages: undefined,
          },
        }),
        db.bannerImage.deleteMany({
          where: {
            bannerId: params.bannerId,
          },
        }),
        db.bannerImage.createMany({
          data: body.images.map((key: string) => ({
            key,
            bannerId: params.bannerId,
          })),
        }),
      ]);

      await utapi.deleteFiles(body.deleteImages);
    } else {
      await db.banner.update({
        where: {
          id: params.bannerId,
        },
        data: {
          ...body,
          images: undefined,
          deleteImages: undefined,
        },
      });
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[BANNER_ID_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// update with new image
export async function PUT(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    const session = await auth();

    const { title, description, images, deleteImages, newImages } =
      await req.json();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const bannerExist = await db.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    });

    if (!bannerExist) {
      return new NextResponse("Banner not found", { status: 404 });
    }

    try {
      await db.$transaction([
        db.banner.update({
          where: {
            id: params.bannerId,
          },
          data: {
            title,
            description,
          },
        }),
        db.bannerImage.deleteMany({
          where: {
            bannerId: params.bannerId,
          },
        }),
        db.bannerImage.createMany({
          data: images.map((key: string) => ({
            key,
            bannerId: params.bannerId,
          })),
        }),
      ]);

      if (deleteImages) {
        await utapi.deleteFiles(deleteImages);
      }
    } catch (error) {
      // if db operation failed then delete the newImages
      await utapi.deleteFiles(newImages?.map((key: string) => key));
      throw error;
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[BANNER_ID_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
