import mongoose from 'mongoose';
import Product from '../dao/models/productSchema.js';

const generateMockProducts = async () => {
  const mockProducts = [];

  for (let i = 0; i < 100; i++) {
    mockProducts.push({
      title: `Produto ${i + 1}`,
      description: `Descrição do Produto ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
      thumbnails: [`url1`, `url2`, `url3`],
      code: `CODE${i + 1}`,
      stock: Math.floor(Math.random() * 100) + 1,
      status: 'disponível',
    });
  }

  await Product.insertMany(mockProducts);
  return 'Produtos mockados inseridos no banco de dados.';
};

export default generateMockProducts;

