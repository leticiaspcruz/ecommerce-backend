import express from 'express';
import ProductsManager from '../dao/productsManager.js';

const router = express.Router();
const productsRoute = '/api/products';

const productsManager = new ProductsManager();

router.get(`${productsRoute}/`, (req, res) => {
  const { limit} = req.query;
  const products = productsManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
  res.send('Lista de produtos:');
});

router.get(`${productsRoute}/:id`, (req, res) => {
  const productId = parseInt(req.params.id); 
  const product = productsManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Produto não encontrado :(' });
  }
  res.send('Produto com o id informado:');
});

router.post(`${productsRoute}/`, (req, res) => {
  const product = req.body;
  res.send('Novo produto adicionado! :D');
});

router.put(`${productsRoute}/:id`, (req, res) => {
  const productId = parseInt(req.params.id);
  const { title, description, price, code, stock, status, thumbnails } = req.body;

  if (!title || !description || !price || !code || !stock || !status) {
    res.status(400).json({ error: 'Todos os campos (exceto thumbnails) são obrigatórios' });
    return;
  }

  const updated = productsManager.updateProduct(productId, {
    title,
    description,
    price,
    code,
    stock,
    status,
    thumbnails,
  });

  if (updated) {
    res.json({ message: 'Produto atualizado com sucesso! :D' });
  } else {
    res.status(404).json({ error: 'Produto não encontrado :(' });
  }
});

router.delete(`${productsRoute}/:id`, (req, res) => {
  const productId = parseInt(req.params.id);
  const deleted = productsManager.deleteProduct(productId);

  if (deleted) {
    res.json({ message: 'Produto excluído com sucesso! :D' });
  } else {
    res.status(404).json({ error: 'Produto não encontrado :(' });
  }
});


export default router;
