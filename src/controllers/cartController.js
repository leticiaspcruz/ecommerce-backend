import Cart from '../dao/models/cartSchema.js';

const CartController = {
  async createCart(req, res) {
      const { userId, products } = req.body;
      try {
        const cart = new Cart({
          userId: userId,
          products: products,
        });
        const savedCart = await cart.save();
        return res.status(201).json(savedCart);
      } catch (error) {
        console.error('Erro ao adicionar produtos ao carrinho:', error);
        return res.status(500).json(error);
      }
    },
    async getUserCart(req, res) {
      const { userId } = req.params;
      try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
          return res.status(404).json({ message: 'Carrinho não encontrado para o usuário especificado.' });
        }
        return res.status(200).json(cart);
      } catch (error) {
        console.error('Erro ao buscar o carrinho do usuário:', error);
        return res.status(500).json(error);
      }
    },
    async getCart(req, res) {
      try {
        const carts = await Cart.find();
    
        return res.status(200).json(carts);
      } catch (error) {
        console.error('Erro ao buscar carrinhos:', error);
        return res.status(500).json(error);
      }
    },
    async deleteCart (req, res) {
        const cart = await Cart.findByIdAndRemove(req.params.id);
        try {      
          if (!cart) {
            return res.status(404).json({ error: 'Carrinho não encontrado.' });
          }
      
          res.status(204).json();
        } catch (error) {
          res.status(500).json({ error: 'Ocorreu um erro ao excluir o carrinho.' });
        }
    },
}

export default CartController;