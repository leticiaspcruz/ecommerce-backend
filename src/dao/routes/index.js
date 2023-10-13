import { Router } from 'express';
import passport from 'passport';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import ProductController from '../../controllers/productController.js';
import CartController from '../../controllers/cartController.js';
import MessageController from '../../controllers/messageController.js';
import UserController from '../../controllers/userController.js';
import { 
    NODEMAILER_CONFIG, 
    TWILIO_ACCOUNT_SID, 
    TWILIO_AUTH_TOKEN, 
    TWILIO_SMS_NUMBER 
} from '../../constants.js';
import generateMockProducts from '../../services/mockingModule.js';

const transport = nodemailer.createTransport(NODEMAILER_CONFIG);

const routes = Router();
const authenticate = passport.authenticate('jwt', { session: false });
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


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

//mailing routes
routes.post('/api/email', (req, res) => {
    let result = transport.sendMail({
        from: 'leticiacoderhouse@gmail.com',
        to: 'leticiacoderhouse@gmail.com',
        subject: 'Teste de envio de email',
        html: `
        <div>
        <h1>Teste de envio de email</h1>
        </div>`,
    });

    res.send('Email enviado com sucesso!');
});

routes.post('/api/sms', (req, res) => {
    const {
        name,
        orderNumber,
        phoneNumber
    } = req.body;
    const result = twilioClient.messages.create({
        body: `Olá ${name}, seu pedido ${orderNumber} foi recebido com sucesso! `,
        from: TWILIO_SMS_NUMBER,
        to: phoneNumber
    });
    console.log(`SMS enviado para ${phoneNumber}`);
    return res.send(`SMS enviado para ${phoneNumber} : ${name}  - Order ${orderNumber}`);
});

//mock route
routes.get('/api/mockingproducts', async (req, res) => {
    try {
      const result = await generateMockProducts();
      res.send(result);
    } catch (error) {
      res.status(500).send('Erro ao gerar e salvar produtos mockados: ' + error);
    }
  });

export default routes;