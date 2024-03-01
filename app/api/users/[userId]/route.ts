import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();

    let user = await db.user.findUnique({
      where: { id: params.userId },
    });

    if (!user) return new NextResponse("User doesn't exist", { status: 404 });

    const oldImage = user.image;

    // for updating password
    if (body.oldPassword && body.newPassword && user.password) {
      const passwordCorrect = await bcrypt.compare(
        body.oldPassword,
        user.password
      );

      if (!passwordCorrect)
        return new NextResponse("Invalid password", { status: 400 });

      body.password = body.newPassword;
      body.oldPassword = undefined;
      body.newPassword = undefined;
    }

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    await db.user.update({
      where: {
        id: params.userId,
      },
      data: body,
    });

    if (body.image && oldImage) {
      await utapi.deleteFiles([oldImage]);
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user)
      return new NextResponse("Unauthorized", { status: 401 });

    let user = await db.user.findUnique({
      where: { id: params.userId },
    });

    if (!user) return new NextResponse("User doesn't exist", { status: 404 });

    await db.user.delete({
      where: {
        id: params.userId,
      },
    });

    if (user.image) {
      await utapi.deleteFiles([user.image]);
    }

    return NextResponse.json({
      message: `User with id: ${params.userId} has been deleted`,
    });
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
