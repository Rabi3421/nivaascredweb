import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined. Add it to .env.local (see .env.example)."
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the Node.js global type to hold the cached connection across
// hot-reloads in Next.js development mode. Without this, each file save
// would open a new connection and exhaust the pool.
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis._mongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis._mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string, {
        bufferCommands: false,
      })
      .then((mg) => mg);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset so the next request can retry
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
