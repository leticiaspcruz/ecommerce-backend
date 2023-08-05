import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/api/login', (req, res) => {
  res.render('login');
});


router.get('/api/products', (req, res) => {
  res.render('product');
});

router.get('/api/carts', (req, res) => {
  res.render('cart');
});

router.get('/api/messages', (req, res) => {
  res.render('chat');
});

export default router;