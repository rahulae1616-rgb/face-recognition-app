import mongoose from 'mongoose';

let memoryServer = null;

export async function connectDb(uri) {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2500 });
    return { ok: true, uri, usingMemory: false };
  } catch (err) {
    // Local dev fallback: if Mongo isn't installed/running, spin up an in-memory MongoDB.
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const memUri = memoryServer.getUri('face_recognition_app');
    await mongoose.connect(memUri);
    return { ok: true, uri: memUri, usingMemory: true, originalError: err?.message || String(err) };
  }
}

export async function stopDb() {
  await mongoose.disconnect().catch(() => {});
  if (memoryServer) {
    await memoryServer.stop().catch(() => {});
    memoryServer = null;
  }
}
