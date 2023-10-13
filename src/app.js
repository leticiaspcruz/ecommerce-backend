import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import compression from 'express-compression';
import routes from './dao/routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

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
app.use(errorHandler);
app.use(passport.initialize());
app.use(compression({
    brotli: { enabled: true, zlib:{} }
}));

app.listen(process.env.PORT || 8080, () => console.log('Server running'));