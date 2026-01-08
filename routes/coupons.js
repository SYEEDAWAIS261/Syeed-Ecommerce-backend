const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
// ✅ Sahi path aur file name use karein
const adminMiddleware = require("../middleware/adminMiddleware");

// @desc  Create coupon (ONLY ADMIN)
// Hum yahan 'adminMiddleware' ko use karenge jo token verify bhi karega aur isAdmin bhi check karega
router.post("/", adminMiddleware, async (req, res) => {
  try {
    const { code, discount, expiresAt, usageLimit } = req.body;
    
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) return res.status(400).json({ message: "Coupon code already exists" });

    const coupon = await Coupon.create({ 
      code: code.toUpperCase(), 
      discount, 
      expiresAt, 
      usageLimit 
    });
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Failed to create coupon" });
  }
});

// @desc Get all coupons for Admin
router.get("/", adminMiddleware, async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        res.json(coupons);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;