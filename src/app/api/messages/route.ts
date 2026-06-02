import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const collection = db.collection("contacts");

    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (error: any) {
    console.error("MongoDB Messages GET API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Failed to fetch messages." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required for deletion." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");
    const collection = db.collection("contacts");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Message not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("MongoDB Messages DELETE API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Failed to delete message." },
      { status: 500 }
    );
  }
}
