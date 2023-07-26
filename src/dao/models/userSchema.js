import mongoose from 'mongoose';

const userCollection = 'users';
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    age: Number,
    password: String,
});

const User = mongoose.model(userCollection, userSchema);

export default User;