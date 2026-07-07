const Cart = require('../server/models/Cart');
const Product = require('../server/models/Product');

const getCart = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest';
    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load cart', error });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId = 'guest', productId, size = 'One Size', quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cartItem = await Cart.findOne({ userId, productId, size });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId,
        productId,
        title: product.title,
        price: product.price,
        discount: product.discount || 0,
        mainimg: product.mainimg,
        size,
        quantity,
        category: product.category,
        stock: product.stock || 0
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Unable to add item to cart', error });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true, runValidators: true }
    );
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update cart item', error });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const removed = await Cart.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to remove cart item', error });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest';
    await Cart.deleteMany({ userId });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to clear cart', error });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
