const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { body, validationResult } = require('express-validator');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, available } = req.query;
    let filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (available !== undefined) {
      filter.available = available === 'true';
    }
    
    const menuItems = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    
    res.json({ success: true, data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private (Admin only)
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').isIn(['appetizer', 'main', 'dessert', 'beverage', 'special']).withMessage('Invalid category')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      
      const menuItem = new MenuItem(req.body);
      await menuItem.save();
      
      res.status(201).json({ success: true, data: menuItem });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    
    res.json({ success: true, data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    
    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
