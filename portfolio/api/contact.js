import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nombre, correo y mensaje son requeridos.' });
  }

  if (name.length > 100 || email.length > 150 || (subject && subject.length > 200) || message.length > 2000) {
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

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err.message);
    return res.status(500).json({ error: 'Error al enviar el correo.' });
  }
}
