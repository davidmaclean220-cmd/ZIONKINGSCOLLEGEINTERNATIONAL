export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { parentName, studentName, phone, email, subject, message } = req.body || {};

  if (!parentName || !studentName || !phone || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const nodemailer = await import('nodemailer');

  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'zionkingscollegeinternational@gmail.com',
      replyTo: email,
      subject: `School Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Parent/Guardian Name:</strong> ${parentName}</p>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({
      error: 'Email service is not configured yet. Add SMTP credentials in Vercel environment variables.',
    });
  }
}
