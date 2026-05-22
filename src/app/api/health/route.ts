import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json(
      {
        success: true,
        message: "NivaasCred API is running",
        database: "connected",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    return NextResponse.json(
      {
        success: false,
        message: "NivaasCred API is running",
        database: "disconnected",
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
