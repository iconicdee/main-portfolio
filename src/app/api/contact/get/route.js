import { connectToDB } from "@/database";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to database
    await connectToDB();

    // Parse request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 },
      );
    }

    // Name validation
    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Name must be at least 2 characters" },
        { status: 400 },
      );
    }

    // Message validation
    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: "Message must be at least 10 characters" },
        { status: 400 },
      );
    }

    // Create new contact document
    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date(),
      isRead: false,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        data: newContact,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// Optional: GET to retrieve all contacts (admin only)
export async function GET(request) {
  try {
    await connectToDB();

    // Optional: Add authentication check here
    // if (!isAdmin) return NextResponse.json({ success: false }, { status: 403 });

    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact GET error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to retrieve contacts" },
      { status: 500 },
    );
  }
}
