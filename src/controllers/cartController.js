import Cart from '../dao/models/cartSchema.js';
import { ERROR_MESSAGES } from '../constants.js';
import CustomError from '../services/customError.js';
import logger from '../utils/logger.js'; 

const CartController = {
  async createCart(req, res) {
    const { userId, products } = req.body;
    try {
      const cart = new Cart({
        userId: userId,
        products: products,
      });
      const savedCart = await cart.save();
      logger.info(`Carrinho criado com sucesso: ${JSON.stringify(savedCart)}`);
      return res.status(201).json(savedCart);
    } catch (error) {
      logger.error(`Erro ao adicionar produtos ao carrinho: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['INVALID_CART_ITEM'], 400);
    }
  },

  async getUserCart(req, res) {
    const { userId } = req.params;
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new CustomError(ERROR_MESSAGES['CART_ITEM_NOT_FOUND'], 404);
      }
      logger.info(`Carrinho do usuário ID ${userId} encontrado: ${JSON.stringify(cart)}`);
      return res.status(200).json(cart);
    } catch (error) {
      logger.error(`Erro ao buscar o carrinho do usuário: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['INVALID_CART_ITEM'], 400);
    }
  },

  async getCart(req, res) {
    try {
      const carts = await Cart.find();
      logger.info(`Carrinhos encontrados: ${JSON.stringify(carts)}`);
      return res.status(200).json(carts);
    } catch (error) {
      logger.error(`Erro ao buscar carrinhos: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['INVALID_CART_ITEM'], 400);
    }
  },

  async deleteCart(req, res) {
    const { id } = req.params;
    try {
      const cart = await Cart.findByIdAndRemove(id);
      if (!cart) {
        throw new CustomError(ERROR_MESSAGES['CART_ITEM_NOT_FOUND'], 404);
      }
      logger.info(`Carrinho excluído com sucesso: ${JSON.stringify(cart)}`);
      res.status(204).json();
    } catch (error) {
      logger.error(`Erro ao excluir o carrinho: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['INVALID_CART_ITEM'], 400);
    }
  },
};

export default CartController;
