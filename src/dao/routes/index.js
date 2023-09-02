import { Router } from 'express';
import ProductController from '../../controllers/productController.js';
import CartController from '../../controllers/cartController.js';
import MessageController from '../../controllers/messageController.js';

const routes = Router();

routes.get('/', (req, res) => {
    res.send('Bem vindx!')
});

//product routes
routes.post('/api/products', ProductController.createProduct);
routes.get('/api/products', ProductController.getProducts);
routes.put('/api/products/:productId', ProductController.updateProduct);
routes.get('/api/products/:productId', ProductController.getProductById);
routes.delete('/api/products/:productId', ProductController.deleteProduct);

//cart routes
routes.post('/api/carts', CartController.createCart);
routes.get('/api/carts/:userId', CartController.getUserCart);
routes.get('/api/carts', CartController.getCart);
routes.delete('/api/cart/:id', CartController.deleteCart);


//messages routes
routes.post('/api/messages', MessageController.createMessage);
routes.get('/api/messages', MessageController.getAllMessages);


export default routes;