import mongoose from "mongoose";
import Education from "@/models/Education";
import { NextResponse } from "next/server";
import connectToDB from "@/database";

export async function GET(req) {
  try {
    await connectToDB();
    const extractedData = await Education.find({});
    return NextResponse.json(
      { success: true, data: extractedData },
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
