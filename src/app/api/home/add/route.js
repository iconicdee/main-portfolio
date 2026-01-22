import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const extractedData = await req.json();
    const savedData = await Home.create(extractedData);

    return NextResponse.json(
      {
        success: true,
        message: "Data saved",
        data: savedData,
      },
      { status: 201 }
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
