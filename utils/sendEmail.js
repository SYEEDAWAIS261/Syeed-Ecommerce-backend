const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  console.log("📩 sendEmail() called with:", { to, subject });

  const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  try {
  console.log("🔍 Verifying transporter...");
  await transporter.verify(); 

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });

  console.log("✅ Email sent successfully!");
  return info; // <--- Info return karein
} catch (err) {
  console.error("❌ Email error:", err);
  throw err; // <--- YE ZAROORI HAI! Iske baghair main code ko pata nahi chalega ke error aaya hai.
}
};

module.exports = sendEmail;
