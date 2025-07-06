import express from 'express';
import expCon from '../Controllers/productController.js';
import authMiddleware from '../Middlewears/authMidd.js';
const router = express.Router();

router.get('/', authMiddleware,expCon.getProducts);
router.get('/:id', authMiddleware, expCon.getProduct);
router.post('/', authMiddleware,expCon.createProduct);
router.put('/:id',authMiddleware, expCon.updateProduct);
router.delete('/:id', authMiddleware,expCon.deleteProduct);

export default router;