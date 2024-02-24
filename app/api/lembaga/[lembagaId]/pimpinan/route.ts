import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { lembagaId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session?.user?.id)
      return new NextResponse("Unathorized", { status: 401 });

    if (!params.lembagaId)
      return new NextResponse("LembagaId not found", { status: 404 });

    const { name, title, image } = await req.json();

    if (!name || !title || !image)
      return new NextResponse("Required field is missing", { status: 400 });

    const pimpinan = await db.pimpinan.create({
      data: {
        name,
        title,
        image,
        lembagaId: params.lembagaId,
      },
    });

    return NextResponse.json(pimpinan);
  } catch (error) {
    console.log("[LEMBAGA_ID_PIMPINAN_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
