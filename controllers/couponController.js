const coupons = require('../server/data/coupons');

const validateCoupon = (req, res) => {
  try {
    const { code, subtotal } = req.body;
    const coupon = coupons.find((item) => item.code.toLowerCase() === String(code).toLowerCase());

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = Number(((subtotal * coupon.value) / 100).toFixed(2));
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }

    res.status(200).json({
      valid: true,
      code: coupon.code,
      discount,
      message: coupon.description,
    });
  } catch (error) {
    res.status(500).json({ message: 'Coupon validation failed', error: error.message });
  }
};

module.exports = { validateCoupon };
