import { MongoClient, ServerApiVersion, Db,Document, Collection} from 'mongodb';


const uri :string ="mongodb+srv://Mtf:MtfDB@cluster0.cyswu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client: MongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connect(): Promise<void> {
  try {
    await client.connect();
    await client.db("MtfProject").command({ ping: 1 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

export function getCollection(collectionName: string): Collection<Document> {
  const db: Db = client.db('');
  return db.collection<Document>(collectionName);
}

export async function close(): Promise<void> {
  await client.close();
}