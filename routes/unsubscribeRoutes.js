const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// ✅ Unsubscribe route
router.get('/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const subscriber = await Subscriber.findOne({ unsubscribeToken: token });

    if (!subscriber) {
      return res.send(renderPage({
        title: "Invalid Link",
        message: "This unsubscribe link is invalid or has expired.",
        icon: "❌",
        color: "#e53e3e",
        buttonText: "Go to Home"
      }));
    }

    // Remove the subscriber
    await Subscriber.deleteOne({ _id: subscriber._id });

    // Success Message
    res.send(renderPage({
      title: "Unsubscribed",
      message: "You have been successfully removed from our mailing list. We're sorry to see you go!",
      icon: "✅",
      color: "#38a169",
      buttonText: "Back to Shop"
    }));

  } catch (err) {
    console.error('Unsubscribe error:', err);
    res.status(500).send(renderPage({
      title: "System Error",
      message: "Something went wrong while processing your request. Please try again later.",
      icon: "⚠️",
      color: "#718096",
      buttonText: "Contact Support"
    }));
  }
});

// --- Professional UI Template Function ---
function renderPage({ title, message, icon, color, buttonText }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Syeed E-commerce</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; }
        .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center; max-width: 450px; width: 90%; }
        .icon { font-size: 50px; margin-bottom: 20px; }
        h1 { color: #2d3748; margin-bottom: 10px; font-size: 24px; }
        p { color: #718096; line-height: 1.6; margin-bottom: 30px; }
        .btn { background-color: #2b6cb0; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background 0.3s; }
        .btn:hover { background-color: #2c5282; }
        .footer { margin-top: 40px; font-size: 12px; color: #a0aec0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon">${icon}</div>
        <h1>${title}</h1>
        <p>${message}</p>
        <a href="https://ai-ecommerce-4a2c6.web.app" class="btn">${buttonText}</a>
        <div class="footer">
          © ${new Date().getFullYear()} Syeed E-commerce. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = router;