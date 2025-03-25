import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://22n228:zny911Vyr0vEXY6H@mg-ngo.91uv0.mongodb.net/?retryWrites=true&w=majority&appName=mg-ngo';
const DATABASE_NAME = 'Ishanya';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(DATABASE_NAME);
    
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
