import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server";

// update without new image
export async function PATCH(
  req: Request,
  { params }: { params: { lembagaId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const lembagaExist = await db.lembaga.findUnique({
      where: {
        id: params.lembagaId,
      },
    });

    if (!lembagaExist) {
      return new NextResponse("Lembaga not found", { status: 404 });
    }

    const oldImage = lembagaExist.image;
    const isImageChange = body?.image && oldImage !== body.image;

    await db.lembaga.update({
      where: {
        id: params.lembagaId,
      },
      data: {
        name: body?.name,
        slug: body.name ? slugify(body.name) : undefined,
        profile: body?.profile,
        visi: body?.visi,
        image: body?.image,
      },
    });

    if (isImageChange && oldImage) {
      await utapi.deleteFiles([oldImage]);
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[LEMBAGA_ID_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
