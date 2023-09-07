import mongoose from 'mongoose';

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

export default mongoose.model(userCollection, userSchema);