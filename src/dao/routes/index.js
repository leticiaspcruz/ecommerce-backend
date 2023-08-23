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
routes.post('/api/carts/:userId', CartController.createCart);
routes.get('/carts/:userId', CartController.getUserCarts);
routes.get('/carts/:userId/:cartId', CartController.getCart);

//messages routes
routes.post('/api/messages', MessageController.createMessage);
routes.get('/api/messages', MessageController.getAllMessages);


export default routes;