import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing from .env");
}

const globalForMongo = globalThis;

export const client =
  globalForMongo.mongoClient || new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}