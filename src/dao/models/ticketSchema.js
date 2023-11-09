import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerEmail: { type: String, required: true },
  purchase: {
    totalCost: { type: Number, required: true },
  },
  cart: {
    items: [{
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }],
    totalItems: { type: Number, required: true },
  },
});

export default mongoose.model('Ticket', ticketSchema);