import { contentCollectionId, databaseId, databases } from "@/lib/appwrite";
import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const content = await databases.getDocument(
//       databaseId,
//       contentCollectionId,
//       id
//     );
//     return NextResponse.json(content);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to get content" },
//       { status: 500 }
//     );
//   }
// }

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { tokenId, fileUrl, imageUrl, type, title, description } =
      await request.json();
    const content = await databases.getDocument(
      databaseId,
      contentCollectionId,
      id
    );
    if (type && !["video", "audio", "image", "text"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    const updatedContent = await databases.updateDocument(
      databaseId,
      contentCollectionId,
      id,
      {
        tokenId: tokenId || content.tokenUri,
        fileUrl: fileUrl || content.fileUrl,
        type: type || content.type,
        imageUrl: imageUrl || content.imageUrl,
        title: title || content.title,
        description: description || content.description,
      }
    );
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
