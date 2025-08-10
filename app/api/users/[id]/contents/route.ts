import { contentCollectionId, databaseId, databases } from "@/lib/appwrite";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const contents = await databases.listDocuments(
      databaseId,
      contentCollectionId,
      [Query.equal("creator", id), Query.limit(10)]
    );
    return NextResponse.json(contents.documents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get user contents" },
      { status: 500 }
    );
  }
}
