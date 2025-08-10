import { contentCollectionId, databaseId, databases } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const content = await databases.getDocument(
      databaseId,
      contentCollectionId,
      id
    );
    const { fileUrl } = content;
    return NextResponse.json({ fileUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get content" },
      { status: 500 }
    );
  }
}
