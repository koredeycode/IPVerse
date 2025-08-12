import {
  databaseId,
  databases,
  ID,
  subscriptionCollectionId,
} from "@/lib/appwrite";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function POST(request: Request) {
  try {
    const { price, subscriber, contentId, duration, contentTitle } =
      await request.json();

    const subscription = await databases.createDocument(
      databaseId,
      subscriptionCollectionId,
      ID.unique(),
      {
        price,
        subscriber,
        contentTitle,
        contentId,
        duration,
      }
    );
    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriber = searchParams.get("subscriber");
    // const creator = searchParams.get("creator");
    const queries = [Query.limit(100)];
    queries.push(Query.orderDesc("$createdAt"));

    if (subscriber) queries.push(Query.equal("subscriber", [subscriber]));
    // if (creator) queries.push(Query.equal("creator", creator));

    const subscriptions = await databases.listDocuments(
      databaseId,
      subscriptionCollectionId,
      queries
    );
    return NextResponse.json(subscriptions.documents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to query content" },
      { status: 500 }
    );
  }
}
