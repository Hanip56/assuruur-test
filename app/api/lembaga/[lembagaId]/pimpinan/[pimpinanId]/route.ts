import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { pimpinanId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const pimpinanExist = await db.pimpinan.findUnique({
      where: {
        id: params.pimpinanId,
      },
    });

    if (!pimpinanExist) {
      return new NextResponse("Pimpinan not found", { status: 404 });
    }

    const oldImage = pimpinanExist.image;
    const isImageChange = body?.image && oldImage !== body.image;

    await db.pimpinan.update({
      where: {
        id: params.pimpinanId,
      },
      data: {
        name: body?.name,
        title: body?.title,
        image: body?.image,
      },
    });

    if (isImageChange && oldImage) {
      await utapi.deleteFiles([oldImage]);
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[PIMPINAN_ID_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
