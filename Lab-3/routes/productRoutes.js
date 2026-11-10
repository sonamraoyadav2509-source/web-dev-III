
const express = require('express');
const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getLowStock,
    getSummary,
    updateStock
} = require('../controllers/productController');

// Create Product
router.post('/', addProduct);

// Get All Products
router.get('/', getProducts);

// Low Stock Report
router.get('/low-stock', getLowStock);

// Category-wise Summary
router.get('/summary', getSummary);

// Update Stock
router.patch('/:id/stock', updateStock);

// Get Single Product
router.get('/:id', getProductById);

// Update Product
router.put('/:id', updateProduct);

// Delete Product
router.delete('/:id', deleteProduct);

module.exports = router;
