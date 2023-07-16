import express from 'express';
import CartsManager from '../dao/cartsManager.js';

const router = express.Router();
const cartsManager = new CartsManager();
const cartsRoute = '/api/carts';

router.post(`${cartsRoute}/`, (req, res) => {
  const { cartId } = req.body;
  cartsManager.createCart(cartId)
    .then(() => {
      res.status(201).json({ message: 'Novo carrinho criado!' });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

router.get(`${cartsRoute}/:id`, (req, res) => {
  const cartId = parseInt(req.params.id);
  cartsManager.getCartById(cartId)
    .then(cart => {
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Carrinho não encontrado' });
      }
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

router.post(`${cartsRoute}/:cartId/product/:productId`, (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const productId = parseInt(req.params.productId);

  cartsManager.addProductToCart(cartId, productId)
    .then(() => {
      res.json({ message: 'Produto adicionado ao carrinho!' });
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});


export default router;
