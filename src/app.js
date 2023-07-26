import express, { urlencoded } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from "express-session";
import cookieParser from 'cookie-parser';
import MongoStore from "connect-mongo";
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import messagesRoutes from './routes/messageRoutes.js';
import initializePassport from "./config/passportConfig.js";

const app = express();
dotenv.config({ path: path.resolve('../.env') });

const port = 8080;
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

const mongoAtlasUrl = process.env.MONGODB_URI;

mongoose.connect(mongoAtlasUrl).then(() => console.log("Connected to mongoDB"))
.catch((error) => {
    if (error) {
    console.log("Cannot connect to mongoDB: " + error)
    process.exit();
    }
});

initializePassport();

app.use(urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoAtlasUrl,
        mongoOptions: { useUnifiedTopology: true },
        ttl: 150,
    }),
    secret: process.env.MONGODB_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/messages', messagesRoutes);
