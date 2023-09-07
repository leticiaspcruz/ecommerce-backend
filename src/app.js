import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './dao/routes/index.js';

dotenv.config({ path: './.env'});

const app = express();
const mongoAtlasUrl = process.env.MONGODB_URI;

mongoose.connect(mongoAtlasUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, console.log('Connected to database'));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 8080, () => console.log('Server running'));