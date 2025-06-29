import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true},
  description:{ type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true, min: 1},
});

export default mongoose.model('Product', productSchema);
