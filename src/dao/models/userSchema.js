import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userCollection = 'users';
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, 'your-secret-key', { expiresIn: '1h' }); // Troque 'your-secret-key' pela sua chave secreta
  return token;
};

export default mongoose.model(userCollection, userSchema);
