import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, company, revenue, stack, pain } = req.body;

  // 1. Setup your email transporter
  // For Gmail: Use an "App Password" (not your main password)
  // For others (Outlook, AWS SES): Use their standard SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use 'host' and 'port' for other providers
    auth: {
      user: process.env.EMAIL_USER, // Set this in Vercel Dashboard
      pass: process.env.EMAIL_PASS, // Set this in Vercel Dashboard
    },
  });

  try {
    // 2. Send the email
    await transporter.sendMail({
      from: `"ScaleQB Website" <${process.env.EMAIL_USER}>`,
      to: "YOUR_REAL_EMAIL@gmail.com", // Replace with where you want to receive leads
      subject: `New Lead: ${company}`,
      html: `
        <h3>New ScaleQB Inquiry</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Revenue:</strong> ${revenue}</p>
        <p><strong>Stack:</strong> ${stack}</p>
        <p><strong>Pain Point:</strong><br/>${pain}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
}
