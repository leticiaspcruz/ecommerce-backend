import Cart from '../dao/models/cartSchema.js';

const CartController = {
    async createCart(req, res) {
        const cart = req.body;
        const { userId } = req.params;

        try {
            const userIdObject = mongoose.Types.ObjectId(userId);
            const createdCart = await Cart.create({ ...cart, userId: userIdObject });
            await createdCart.populate('products').execPopulate();
            return res.status(200).json(createdCart);
        } catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },
    async getUserCarts(req, res) {
        const { userId } = req.params;
        try {
            const userCarts = await Cart.find(userId ).populate('products');
            return res.status(200).json(userCarts);
        } catch(error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },

    async getCart(req, res) {
        const { userId, cartId } = req.params;
        try {
            const cart = await Cart.findById(cartId).populate('products');
            return res.status(200).json(cart);
        } catch(error) {
            console.error(error);
            return res.status(500).json(error);
        }
    }
}

export default CartController;