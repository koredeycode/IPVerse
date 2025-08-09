import { NextResponse } from "next/server";
import {
  databaseId,
  databases,
  subscriptionCollectionId,
} from "@/lib/appwrite";
import { Query } from "node-appwrite";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const subscriptions = await databases.listDocuments(
      databaseId,
      subscriptionCollectionId,
      [Query.equal("subscriber", id), Query.limit(10)]
    );
    return NextResponse.json(subscriptions.documents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get user subscriptions" },
      { status: 500 }
    );
  }
}
