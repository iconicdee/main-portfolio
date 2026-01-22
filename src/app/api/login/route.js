import connectToDB from "@/database";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { hash, compare } from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req) {
  console.log(req);
  try {
    await connectToDB();
    const body = await req.json();
    const { username, password } = body;
    console.log(username, password);
    const checkUser = await User.findOne({ username });
    console.log("checkUser", checkUser);

    if (!checkUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User name is not present !Please try again",
          result: body,
          response: checkUser,
        },
        { status: 500 }
      );
    }
    const hashPassword = await hash(checkUser.password, 12);
    const checkPassword = await compare(password, hashPassword);

    if (!checkPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Wrong password, Please try again ",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
