import mongoose from 'mongoose'
import { config } from '../config'

const MONGODB_URI = `mongodb+srv://${config.db.user}:${config.db.password}@cluster0.rlv5r.mongodb.net/${config.db.name}?retryWrites=true&w=majority`

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose)
  }
  cached.conn = await cached.promise
  return cached.conn
}

export { dbConnect }
