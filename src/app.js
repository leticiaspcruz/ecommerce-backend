import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import compression from 'express-compression';
import routes from './dao/routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './utils/logger.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config({ path: './.env'});

const app = express();
const mongoAtlasUrl = process.env.MONGODB_URI;


const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'Coderhouse Ecommerce',
        version: '1.0.0',
        description: 'Ecommerce criado para o curso de Backend da Coderhouse',
      },
      servers: [
        {
          url: 'http://localhost:8080', 
          description: 'Servidor local',
        },
      ],
    },
    apis: ['src/dao/routes/index.js'],
  };

const specs = swaggerJsdoc(swaggerOptions);

mongoose.connect(mongoAtlasUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, logger.debug('Connected to database'));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.use(passport.initialize());
app.use(compression({
    brotli: { enabled: true, zlib:{} }
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT || 8080, () => logger.debug('Server running'));