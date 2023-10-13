import Product from '../dao/models/productSchema.js';
import { ERROR_MESSAGES } from '../constants.js';
import CustomError from '../services/customError.js';

const ProductController = {
    async createProduct(req, res) {
        const product = req.body;
        try {
            const newProduct = await Product.create(product)  
            return res.status(200).json(newProduct)

        } catch(error) {
            console.error(error);
            throw new CustomError(ERROR_MESSAGES['INVALID_PRODUCT_DATA'], 400);
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

            if (!updatedProduct) {
                throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
            }

            return res.status(200).json(updatedProduct);
        } catch(error) {
            console.error(error);
            throw new CustomError(ERROR_MESSAGES['INVALID_PRODUCT_DATA'], 400);
        }
    },

    async deleteProduct(req, res) {
        const { productId } = req.params
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId)

            if (!deletedProduct) {
                throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
            }

            return res.status(200).json(deletedProduct)
        } catch(error) {
            console.error(error);
            throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
        }
    },

    async getProducts(req, res) {
        try {
            const products = await Product.find()
            return res.status(200).json(products)
        } catch(error) {
            console.error(error);
            throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
        }
    },

    async getProductById(req, res) {
        const { productId } = req.params
        try {
            const product = await Product.findById(productId)

            if (!product) {
                throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
            }

            return res.status(200).json(product);
        } catch(error) {
            console.error(error);
            throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
        }
    }
}

export default ProductController;