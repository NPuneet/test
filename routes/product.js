const express = require('express');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/product');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware(['admin']), createProduct);
router.get('/', getProducts);
router.put('/:id', authMiddleware(['admin', 'manager']), updateProduct);
router.delete('/:id', authMiddleware(['admin']), deleteProduct);

module.exports = router;
