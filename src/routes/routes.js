import express from 'express';
import loginRoutes from './loginRoutes.js';
import userRoutes from './userRoutes.js';
import cartRoutes from './cartRoutes.js';
import messagesRoutes from './messageRoutes.js';
import productRoutes from './productRoutes.js';

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/user', userRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);
router.use('/messages', messagesRoutes);

export default router;
