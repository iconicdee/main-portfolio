import connectToDB from "@/database";
import About from "@/models/About";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const extractedData = await req.json();
    console.log("extractedData", extractedData);
    const savedData = await About.create(extractedData);

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
