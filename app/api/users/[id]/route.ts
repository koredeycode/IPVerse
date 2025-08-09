import { NextResponse } from "next/server";
import { databaseId, databases, userCollectionId } from "@/lib/appwrite";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await databases.getDocument(databaseId, userCollectionId, id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, bio, twitter } = await request.json();
    const user = await databases.getDocument(databaseId, userCollectionId, id);
    const updatedUser = await databases.updateDocument(
      databaseId,
      userCollectionId,
      id,
      {
        title: title || user.title,
        bio: bio || user.bio,
        twitter: twitter || user.twitter,
      }
    );
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
