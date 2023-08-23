import Product from '../dao/models/productSchema.js';

const ProductController = {
    async createProduct(req, res) {
        const product = req.body;
        try {
            const newProduct = await Product.create(product)  
            return res.status(200).json(newProduct)

        } catch(error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },

    async updateProduct(req, res) {
        const { productId } = req.params;
        const updatedFields = req.body;

        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                updatedFields
            );
            return res.status(200).json(updatedProduct);
        } catch(error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },

    async deleteProduct(req, res) {
        const { productId } = req.params
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId)
            return res.status(200).json(deletedProduct)
        } catch(error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },

    async getProducts(req, res) {
        try {
            const products = await Product.find()
            return res.status(200).json(products)
        } catch(error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },

    async getProductById(req, res) {
        const { productId } = req.params
        try {
            const product = await Product.findById(productId)
            return res.status(200).json(product);
        } catch(error) {
            console.error(error);
            return res.status(500).json(error);
        }
    }
}

export default ProductController;