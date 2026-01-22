import connectToDB from "@/database";
import Home from "@/models/Home"; // use exact filename casing
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const extractData = await req.json();
    const { _id, heading, summary } = extractData;

    const updateData = await Home.findOneAndUpdate(
      { _id },
      { heading, summary },
      { new: true }
    );

    if (updateData) {
      return NextResponse.json({ success: true, message: "update successful" });
    }
    return NextResponse.json({
      success: false,
      message: "update not successful",
    });
  } catch (e) {
    return NextResponse.json({ success: false, message: "update failed" });
  }
}
