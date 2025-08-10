import { databaseId, databases, ID, userCollectionId } from "@/lib/appwrite";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function POST(request: Request) {
  try {
    const { wallet, title, bio, twitter } = await request.json();
    if (!wallet || !title || !twitter) {
      return NextResponse.json(
        { error: "Missing required fields: wallet, title, twitter" },
        { status: 400 }
      );
    }
    const user = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        wallet,
        title,
        bio: bio || "",
        twitter,
      }
    );
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");
    // const creator = searchParams.get("creator");
    const queries = [Query.limit(10)];

    if (wallet) queries.push(Query.equal("wallet", [wallet]));
    // if (creator) queries.push(Query.equal("creator", creator));

    const users = await databases.listDocuments(
      databaseId,
      userCollectionId,
      queries
    );
    return NextResponse.json(users.documents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to query content" },
      { status: 500 }
    );
  }
}
