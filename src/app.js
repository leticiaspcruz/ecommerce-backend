import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import messagesRoutes from './routes/messageRoutes.js';

const app = express();

app.use(urlencoded({extended: true}));
app.use(express.json());

const port = 8080;
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

const mongoAtlasUrl = process.env.MONGODB_URI;

mongoose.connect(mongoAtlasUrl)
.catch((error) => {
    if (error) {
    console.log("Cannot connect to mongoDB: " + error)
    process.exit();
    }
});

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/messages', messagesRoutes);


