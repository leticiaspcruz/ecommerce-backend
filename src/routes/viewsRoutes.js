import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('login');
});


router.get('/products', (req, res) => {
  res.render('product');
});

router.get('/carts', (req, res) => {
  res.render('cart');
});

router.get('/messages', (req, res) => {
  res.render('chat');
});

export default router;