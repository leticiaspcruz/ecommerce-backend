import fs from 'fs';

class CartsManager {
  constructor(path) {
    this.path = path;
  }

  async createCart(userId, items) {
    const { Cart } = require('./models/cartSchema');

    try {
      const cart = new Cart({
        userId,
        items,
      });
      await cart.save();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error('Erro ao criar o carrinho'));
    }
  }

  async getCartByUserId(userId) {
    try {
      const cart = await Cart.findOne({ userId });
      if (cart) {
        return Promise.resolve(cart);
      } else {
        return Promise.reject(new Error('Carrinho não encontrado'));
      }
    } catch (error) {
      return Promise.reject(new Error('Erro ao obter o carrinho'));
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error('Carrinho não encontrado');
      }

      const existProduct = cart.items.find((item) => item.productId === productId);
      if (existProduct) {
        existProduct.quantity++;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }

      await cart.save();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getCartsFromStorage() {
    if (fs.existsSync(this.path)) {
      const fileData = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileData) || [];
    }
    return [];
  }

  saveCartsToStorage(carts) {
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2), 'utf-8');
  }
}

export default CartsManager;
