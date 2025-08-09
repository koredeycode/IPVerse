// lib/appwrite.js
import { Client, Databases, ID } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.NEXT_APPWRITE_KEY!); // Server-side only

export const databases = new Databases(client);
export const databaseId = process.env.APPWRITE_DATABASE_ID!;

export const userCollectionId = process.env.APPWRITE_USER_COLLECTION_ID!;
export const contentCollectionId = process.env.APPWRITE_CONTENT_COLLECTION_ID!;
export const subscriptionCollectionId =
  process.env.APPWRITE_SUBSCRIPTION_COLLECTION_ID!;

export { ID };
