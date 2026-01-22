import connectToDB from "@/database";
import Experience from "@/models/Experience";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const extractedData = await req.json();
    if (!extractedData || Object.keys(extractedData).length === 0) {
      return NextResponse.json(
        { success: false, message: "Request body is empty" },
        { status: 400 }
      );
    }

    const savedData = await Experience.create(extractedData);
    if (!savedData) {
      return NextResponse.json(
        { success: false, message: "Unable to save experience" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: savedData },
      { status: 201 }
    );
  } catch (e) {
    console.error("experience POST error:", e);
    const status = e.name === "ValidationError" ? 400 : 500;
    return NextResponse.json(
      { success: false, message: e.message || "Server error" },
      { status }
    );
  }
}
