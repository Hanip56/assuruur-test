import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { NextResponse } from "next/server";

// update without new image
export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const productExist = await db.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!productExist) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Check if there is any deleted image
    if (body.deleteImages) {
      await db.$transaction([
        db.product.update({
          where: {
            id: params.productId,
          },
          data: {
            ...body,
            images: undefined,
            deleteImages: undefined,
          },
        }),
        db.image.deleteMany({
          where: {
            productId: params.productId,
          },
        }),
        db.image.createMany({
          data: body.images.map((url: string) => ({
            url,
            productId: params.productId,
          })),
        }),
      ]);

      await utapi.deleteFiles(body.deleteImages);
    } else {
      await db.product.update({
        where: {
          id: params.productId,
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
    console.log("[PRODUCT_ID_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// update with new image
export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const productExist = await db.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!productExist) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const formData = await req.formData();

    const name = formData.get("name") as string | undefined;
    const oldImages = formData.getAll("oldImages");
    const deleteImages = formData.getAll("deleteImages") as
      | string[]
      | undefined;
    const newImagesTemp = formData.get("newImages") as string | undefined;
    let newImages;

    if (newImagesTemp) {
      newImages = JSON.parse(newImagesTemp);
    }

    const images = [
      ...(oldImages ?? []),
      ...newImages?.map((img: any) => img?.key),
    ];

    try {
      await db.$transaction([
        db.product.update({
          where: {
            id: params.productId,
          },
          data: {
            name,
          },
        }),
        db.image.deleteMany({
          where: {
            productId: params.productId,
          },
        }),
        db.image.createMany({
          data: images.map((url: string) => ({
            url,
            productId: params.productId,
          })),
        }),
      ]);

      if (deleteImages) {
        await utapi.deleteFiles(deleteImages);
      }
    } catch (error) {
      // if db operation failed then delete the newImages
      await utapi.deleteFiles(newImages?.map((img: any) => img?.key));
      throw error;
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[PRODUCT_ID_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// delete product
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = auth();

    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
      },
    });

    if (!product)
      return new NextResponse("Product doesnt exist", { status: 404 });

    await db.product.delete({
      where: {
        id: params.productId,
      },
    });

    await utapi.deleteFiles(product.images.map((img) => img.url));

    return NextResponse.json(`Product with id:${product.id} has been deleted`);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
