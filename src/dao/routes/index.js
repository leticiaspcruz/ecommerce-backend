import { Router } from 'express';
import passport from 'passport';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import ProductController from '../../controllers/productController.js';
import CartController from '../../controllers/cartController.js';
import MessageController from '../../controllers/messageController.js';
import UserController from '../../controllers/userController.js';
import TicketController from  '../../controllers/ticketController.js';
import { 
    NODEMAILER_CONFIG, 
    TWILIO_ACCOUNT_SID, 
    TWILIO_AUTH_TOKEN, 
    TWILIO_SMS_NUMBER 
} from '../../constants.js';
import generateMockProducts from '../../services/mockingModule.js';
import logger from '../../utils/logger.js';

const transport = nodemailer.createTransport(NODEMAILER_CONFIG);

const routes = Router();
const authenticate = passport.authenticate('jwt', { session: false });
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota inicial
 *     description: Retorna uma mensagem de boas-vindas
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 */

routes.get('/', (req, res) => {
    res.send('Bem vindx!')
});

//product routes

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags:
 *       - Products
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/dao/models/productSchema'
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
routes.post('/api/products', ProductController.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtém todos os produtos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de produtos obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/api/products', ProductController.getProducts);

/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID do produto a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/dao/models/productSchema'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
routes.put('/api/products/:productId', ProductController.updateProduct);

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Obtém um produto por ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID do produto a ser obtido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto obtido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
routes.get('/api/products/:productId', ProductController.getProductById);

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Deleta um produto
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID do produto a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
routes.delete('/api/products/:productId', ProductController.deleteProduct);

//cart routes

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Cria um novo carrinho
 *     tags:
 *       - Carts
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/dao/models/cartSchema'
 *     responses:
 *       200:
 *         description: Carrinho criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
routes.post('/api/carts', CartController.createCart);

/**
 * @swagger
 * /api/carts/{userId}:
 *   get:
 *     summary: Obtém o carrinho de um usuário
 *     tags:
 *       - Carts
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrinho obtido com sucesso
 *       404:
 *         description: Carrinho não encontrado
 */
routes.get('/api/carts/:userId', CartController.getUserCart);

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Obtém todos os carrinhos
 *     tags:
 *       - Carts
 *     responses:
 *       200:
 *         description: Lista de carrinhos obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/api/carts', CartController.getCart);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Deleta um carrinho
 *     tags:
 *       - Carts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do carrinho a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrinho deletado com sucesso
 *       404:
 *         description: Carrinho não encontrado
 */
routes.delete('/api/cart/:id', CartController.deleteCart);


//messages routes

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Cria uma nova mensagem
 *     tags:
 *       - Messages
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/dao/models/messageSchema'
 *     responses:
 *       200:
 *         description: Mensagem criada com sucesso
 *       400:
 *         description: Requisição inválida
 */
routes.post('/api/messages', MessageController.createMessage);

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Obtém todas as mensagens
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Lista de mensagens obtida com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
routes.get('/api/messages', MessageController.getAllMessages);


//user routes

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/dao/models/userSchema'
 *     responses:
 *       200:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Requisição inválida
 */
routes.post('/api/register', UserController.registerUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/dao/models/userSchema'
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       401:
 *         description: Falha na autenticação
 */
routes.post('/api/login', UserController.userLogin);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtém todos os usuários
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.get('/api/users', authenticate, UserController.getUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Obtém um usuário por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário a ser obtido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário obtido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
routes.get('/api/users/:userId', UserController.getUserById);

//ticket routes

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Cria um ticket de compra
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: Ticket criado com sucesso
 *       400:
 *         description: Erro ao criar ticket
 */
routes.post('/api/tickets', TicketController.createTicket);

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Retorna todos os tickets de compra
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: Todos os tickets obtidos
 *       404:
 *         description: Erro ao obter tickets
 */
routes.get('/api/tickets', TicketController.getTickets);

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Retorna o ticket de compra pelo seu id
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: Ticket obtido por ID
 *       404:
 *         description: Erro ao obter ticket por ID
 */
routes.get('/api/tickets/:ticketId', TicketController.getTicketById);

//mailing routes

/**
 * @swagger
 * /api/email:
 *   post:
 *     summary: Envia um e-mail
 *     tags:
 *       - Mailing
 *     responses:
 *       200:
 *         description: E-mail enviado com sucesso
 *       500:
 *         description: Erro interno do servidor ao enviar e-mail
 */

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

/**
 * @swagger
 * /api/sms:
 *   post:
 *     summary: Envia um SMS
 *     tags:
 *       - Mailing
 *     responses:
 *       200:
 *         description: SMS enviado com sucesso
 *       500:
 *         description: Erro interno do servidor ao enviar SMS
 */
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

/**
 * @swagger
 * /api/mockingproducts:
 *   get:
 *     summary: Gera produtos mockados
 *     tags:
 *       - Mocking
 *     responses:
 *       200:
 *         description: Produtos mockados gerados com sucesso
 *       500:
 *         description: Erro ao gerar produtos mockados
 */
routes.get('/api/mockingproducts', async (req, res) => {
    try {
      const result = await generateMockProducts();
      res.send(result);
    } catch (error) {
      res.status(500).send('Erro ao gerar e salvar produtos mockados: ' + error);
    }
    });

//logger route

/**
 * @swagger
 * /api/loggertest:
 *   get:
 *     summary: Envia mensagens de log para teste
 *     tags:
 *       - Logging
 *     responses:
 *       200:
 *         description: Mensagens de log enviadas com sucesso
 */
routes.get('/api/loggertest', (req, res) => {
    logger.debug('Mensagem de depuração para teste');
    logger.info('Mensagem de informação para teste');
    logger.warn('Mensagem de aviso para teste');
    logger.error('Mensagem de erro para teste');
    res.send('Logs enviados para console e arquivo!');
});


export default routes;