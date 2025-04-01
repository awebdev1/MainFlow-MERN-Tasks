const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET all cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST add to cart
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const newCartItem = new Cart({ productId, quantity });
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE remove from cart
router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true } 
    ).populate('productId');
    
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;