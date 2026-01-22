import connectToDB from "@/database";
import About from "@/models/About";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const extractData = await req.json();
    console.log(extractData);
    const { _id, aboutme, noofproject, yearofexperience, noofclient, skills } =
      extractData;

    const updateData = await About.findOneAndUpdate(
      { _id },
      { aboutme, noofproject, yearofexperience, noofclient, skills },
      { new: true }
    );

    if (updateData) {
      return NextResponse.json({
        success: true,
        message: "update successful",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "update not successful",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "update failed",
    });
  }
}
