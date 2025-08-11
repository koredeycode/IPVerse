import { NextResponse } from "next/server";

import { contentCollectionId, databaseId, databases, ID } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export async function POST(request: Request) {
  try {
    const { creator } = await request.json();

    if (!creator) {
      return NextResponse.json(
        { error: "Missing or invalid file" },
        { status: 400 }
      );
    }

    const content = await databases.createDocument(
      databaseId,
      contentCollectionId,
      ID.unique(),
      { creator }
    );
    return NextResponse.json(content);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    // const creator = searchParams.get("creator");
    const queries = [Query.limit(10)];

    if (type) queries.push(Query.equal("type", type));
    // if (creator) queries.push(Query.equal("creator", creator));

    const contents = await databases.listDocuments(
      databaseId,
      contentCollectionId,
      queries
    );
    return NextResponse.json(contents.documents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to query content" },
      { status: 500 }
    );
  }
}
