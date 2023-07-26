import fs from 'fs';

class ProductsManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(title, description, price, thumbnails, code, stock, status) {
    if (!title || !description || !price || !code || !stock || !status) {
      throw new Error("Todos os campos são obrigatórios, exceto o thumbnails");
    }

    const { Product } = require('./models/productSchema');

    try {
      const product = new Product({
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
      });

      await product.save();
    } catch (error) {
      throw new Error("Erro ao adicionar o produto");
    }
  }

  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error("Erro ao obter os produtos");
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      return product || null;
    } catch (error) {
      throw new Error("Erro ao obter o produto");
    }
  }

  async updateProduct(productId, updatedFields) {
    try {
      const product = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });
      return product ? true : false;
    } catch (error) {
      throw new Error("Erro ao atualizar o produto");
    }
  }

  async deleteProduct(productId) {
    try {
      await Product.findByIdAndRemove(productId);
    } catch (error) {
      throw new Error("Erro ao excluir o produto");
    }
  }

  getProductsFromStorage() {
    if (fs.existsSync(this.path)) {
      const fileData = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileData) || [];
    }
    return [];
  }

  saveProductsToStorage(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }
}

export default ProductsManager;
