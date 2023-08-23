import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Cart', cartSchema)