import { Router } from 'express';
import passport from 'passport';
import ProductController from '../../controllers/productController.js';
import CartController from '../../controllers/cartController.js';
import MessageController from '../../controllers/messageController.js';
import UserController from '../../controllers/userController.js';

const routes = Router();
const authenticate = passport.authenticate('jwt', { session: false });

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


//user routes
routes.post('/api/register', UserController.registerUser);
routes.post('/api/login', UserController.userLogin);
routes.get('/api/users', authenticate, UserController.getUsers);
routes.get('/api/users/:userId', UserController.getUserById);


export default routes;