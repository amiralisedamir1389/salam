import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://sedamirbagheri_db_user:sedamir1389@cluster0.jdrrw4z.mongodb.net/?appName=Cluster0";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'همه فیلدها الزامی است' });
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('mySite');
        const collection = db.collection('users');
        const result = await collection.insertOne({ name, email, password, createdAt: new Date() });
        res.status(200).json({ message: 'ذخیره شد!', id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
}
