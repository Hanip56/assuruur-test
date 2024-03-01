import { auth } from "@/auth";
import { db } from "@/lib/db";
import { utapi } from "@/lib/upload-thing-server";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password, image } = await req.json();

    if (!username || !email || !password || !image) {
      return new NextResponse("Required field is missing", { status: 400 });
    }

    const session = await auth();

    if (!session || !session.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userExist = await db.user.findUnique({
      where: { name: username },
    });

    if (userExist)
      return new NextResponse("User already exist", { status: 409 });

    let user;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      user = await db.user.create({
        data: {
          name: username,
          email,
          password: hashedPassword,
          image,
        },
      });
    } catch (error) {
      await utapi.deleteFiles([image]);
      throw error;
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_REGISTER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
