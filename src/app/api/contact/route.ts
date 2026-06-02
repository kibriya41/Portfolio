import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");
    const collection = db.collection("contacts");

    const result = await collection.insertOne({
      name,
      email,
      subject: subject || "",
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error: any) {
    console.error("MongoDB Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Failed to save contact information." },
      { status: 500 }
    );
  }
}
