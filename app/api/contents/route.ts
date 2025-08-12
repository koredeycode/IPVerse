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
    const { $id: id } = content;
    return NextResponse.json({ id });
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
    const queries = [Query.limit(100)];
    queries.push(Query.isNotNull("type"));
    queries.push(Query.orderDesc("$createdAt"));

    const { searchParams } = new URL(request.url);
    // const type = searchParams.get("type");
    const creator = searchParams.get("creator");
    if (creator) {
      queries.push(Query.equal("creator", [creator]));
    }

    // if (type) queries.push(Query.equal("type", type));
    // if (creator) queries.push(Query.equal("creator", creator));

    const contents = await databases.listDocuments(
      databaseId,
      contentCollectionId,
      queries
    );

    // Only send specific fields
    const filtered = contents.documents
      .filter((doc) => doc.fileUrl)
      .map((doc) => ({
        id: doc.$id,
        title: doc.title,
        creator: doc.creator,
        description: doc.description,
        imageUrl: doc.imageUrl,
        type: doc.type,
        createdAt: doc.$createdAt,
      }));

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to query content" },
      { status: 500 }
    );
  }
}
