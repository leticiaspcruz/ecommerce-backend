import Product from '../dao/models/productSchema.js';
import { ERROR_MESSAGES } from '../constants.js';
import CustomError from '../services/customError.js';
import logger from '../utils/logger.js'; 

const ProductController = {
    async createProduct(req, res) {
      const product = req.body;
      try {
        const newProduct = await Product.create(product);
        logger.info(`Novo produto criado: ${JSON.stringify(newProduct)}`);
        return res.status(200).json(newProduct);
      } catch(error) {
        logger.error(`Erro ao criar produto: ${error.message}`);
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
  
        logger.info(`Produto atualizado: ${JSON.stringify(updatedProduct)}`);
        return res.status(200).json(updatedProduct);
      } catch(error) {
        logger.error(`Erro ao atualizar produto: ${error.message}`);
        throw new CustomError(ERROR_MESSAGES['INVALID_PRODUCT_DATA'], 400);
      }
    },
  
    async deleteProduct(req, res) {
      const { productId } = req.params;
      try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
  
        if (!deletedProduct) {
          throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
        }
  
        logger.info(`Produto excluído: ${JSON.stringify(deletedProduct)}`);
        return res.status(200).json(deletedProduct);
      } catch(error) {
        logger.error(`Erro ao excluir produto: ${error.message}`);
        throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
      }
    },
  
    async getProducts(req, res) {
      try {
        const products = await Product.find();
        logger.info(`Todos os produtos obtidos: ${JSON.stringify(products)}`);
        return res.status(200).json(products);
      } catch(error) {
        logger.error(`Erro ao obter produtos: ${error.message}`);
        throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
      }
    },
  
    async getProductById(req, res) {
      const { productId } = req.params;
      try {
        const product = await Product.findById(productId);
  
        if (!product) {
          throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
        }
  
        logger.info(`Produto obtido por ID: ${JSON.stringify(product)}`);
        return res.status(200).json(product);
      } catch(error) {
        logger.error(`Erro ao obter produto por ID: ${error.message}`);
        throw new CustomError(ERROR_MESSAGES['PRODUCT_NOT_FOUND'], 404);
      }
    }
  };

export default ProductController;