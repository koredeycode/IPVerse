import { databaseId, databases, userCollectionId } from "@/lib/appwrite";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check Appwrite database connectivity
    await databases.listDocuments(databaseId, userCollectionId, []); // Simple query to test connection

    return NextResponse.json(
      {
        status: "healthy",
        services: {
          appwrite: { status: "ok", message: "Database connection successful" },
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        services: {
          appwrite: { status: "error", message: "Database connection failed" },
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
