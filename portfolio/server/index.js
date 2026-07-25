import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const DATA_FILE = path.join(__dirname, 'data', 'recommendations.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify().then(() => {
  console.log('Email transporter ready');
}).catch((err) => {
  console.error('Email transporter error:', err.message);
});

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

app.get('/api/recommendations', (req, res) => {
  const recs = readData();
  res.json(recs);
});

app.post('/api/recommendations', (req, res) => {
  const { name, role, text, rating } = req.body;

  if (!name || !text) {
    return res.status(400).json({ error: 'Nombre y mensaje son requeridos.' });
  }

  if (name.length > 100 || text.length > 1000) {
    return res.status(400).json({ error: 'Texto demasiado largo.' });
  }

  const rec = {
    id: Date.now(),
    name: name.trim(),
    role: (role || 'Colaborador').trim(),
    text: text.trim(),
    rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
    date: new Date().toLocaleDateString('es-GT'),
  };

  const recs = readData();
  recs.unshift(rec);
  writeData(recs);

  res.status(201).json(rec);
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nombre, correo y mensaje son requeridos.' });
  }

  if (name.length > 100 || email.length > 150 || subject.length > 200 || message.length > 2000) {
    return res.status(400).json({ error: 'Texto demasiado largo.' });
  }

  try {
    await transporter.sendMail({
      from: `"Portafolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portafolio] ${subject || 'Nuevo mensaje de contacto'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D1A646; border-bottom: 2px solid #D1A646; padding-bottom: 10px;">Nuevo mensaje de contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Nombre:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Correo:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Asunto:</td><td style="padding: 8px 0;">${subject || 'Sin asunto'}</td></tr>
          </table>
          <div style="margin-top: 15px; padding: 15px; background: #f9f9f9; border-left: 3px solid #D1A646;">
            <p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">Enviado desde tu portafolio</p>
        </div>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err.message);
    res.status(500).json({ error: 'Error al enviar el correo.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
