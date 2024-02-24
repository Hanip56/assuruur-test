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

    const { misi1, misi2, misi3, misi4, misi5, misi6 } = await req.json();

    const data = [misi1, misi2, misi3, misi4, misi5, misi6].map((misi) => ({
      content: misi ?? "",
      lembagaId: params.lembagaId,
    }));

    await db.$transaction([
      db.misi.deleteMany({
        where: {
          lembagaId: params.lembagaId,
        },
      }),
      db.misi.createMany({
        data,
      }),
    ]);

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[LEMBAGA_ID_MISI_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
