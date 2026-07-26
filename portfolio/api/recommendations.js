import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const DB_NAME = 'portfolio';
const COLLECTION = 'recommendations';

async function connect() {
  await client.connect();
  return client.db(DB_NAME).collection(COLLECTION);
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const col = await connect();
      const recs = await col.find().sort({ date: -1 }).toArray();
      return res.status(200).json(recs);
    } catch (err) {
      console.error('GET recommendations error:', err.message);
      return res.status(500).json({ error: 'Error al obtener recomendaciones.' });
    }
  }

  if (req.method === 'POST') {
    const { name, role, text, rating } = req.body;

    if (!name || !text) {
      return res.status(400).json({ error: 'Nombre y mensaje son requeridos.' });
    }

    if (name.length > 100 || text.length > 1000) {
      return res.status(400).json({ error: 'Texto demasiado largo.' });
    }

    const rec = {
      name: name.trim(),
      role: (role || 'Colaborador').trim(),
      text: text.trim(),
      rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
      date: new Date().toLocaleDateString('es-GT'),
    };

    try {
      const col = await connect();
      const result = await col.insertOne(rec);
      rec.id = result.insertedId;
      return res.status(201).json(rec);
    } catch (err) {
      console.error('POST recommendations error:', err.message);
      return res.status(500).json({ error: 'Error al guardar recomendación.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
