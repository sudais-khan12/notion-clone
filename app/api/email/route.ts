import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmail"; // Adjust the import path

export async function POST(request: Request) {
  try {
    console.log("Received request at /api/email");

    const body = await request.json();
    const { from, subject, content } = body;

    console.log("Request body:", { from, subject, content });

    // Validate the input
    if (!from || !subject || !content) {
      console.error("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send the email
    await sendEmail({
      from, // Sender's email (passed from the frontend)
      to: process.env.EMAIL_USER!, // Recipient's email (from environment variables)
      subject,
      html: content,
    });

    console.log("Email sent successfully");
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
