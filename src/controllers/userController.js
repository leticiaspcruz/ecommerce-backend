import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../dao/models/userSchema.js';
import dotenv from 'dotenv';
import { ERROR_MESSAGES } from '../constants.js';
import CustomError from '../services/customError.js';
import logger from '../utils/logger.js'; 

dotenv.config({ path: './.env'});

const jwtOptions = {
  jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:  process.env.JWT_SECRET_KEY,
};

passport.use(new Strategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

const UserController = {
  async registerUser(req, res) {
    try {
      const { name, email, password, role } = req.body;
      if (!role || !['user', 'admin'].includes(role)) {
        throw new CustomError(ERROR_MESSAGES['INVALID_ROLE'], 400);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      logger.info(`Usuário registrado com sucesso: ${JSON.stringify(user)}`);
      res.json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
      logger.error(`Erro ao registrar usuário: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['INVALID_USER_DATA'], 400);
    }
  },

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new CustomError(ERROR_MESSAGES['USER_NOT_FOUND'], 401);
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new CustomError(ERROR_MESSAGES['INVALID_CREDENTIALS'], 401);
      }
      const token = user.generateAuthToken();
      logger.info(`Usuário logado com sucesso: ${JSON.stringify(user)}`);
      res.json({ token });
    } catch (error) {
      logger.error(`Erro ao fazer login: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['INVALID_USER_DATA'], 400);
    }
  },
  async getUsers(req, res) {
    try {
      if (req.user.role !== 'admin') {
        throw new CustomError(ERROR_MESSAGES['UNAUTHORIZED_ACCESS'], 403);
      }
  
      const users = await User.find();
      logger.info(`Todos os usuários obtidos: ${JSON.stringify(users)}`);
      return res.json(users);
    } catch (error) {
      if (error.code === 403) {
        logger.error(`Usuário não autorizado a acessar a rota: ${error.message}`);
      } else {
        logger.error(`Erro ao obter usuários: ${error.message}`);
      }
      throw new CustomError(ERROR_MESSAGES['USER_NOT_FOUND'], 404);
    }
  },

  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      if (req.user.role !== 'admin') {
        throw new CustomError(ERROR_MESSAGES['UNAUTHORIZED_ACCESS'], 403);
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new CustomError(ERROR_MESSAGES['USER_NOT_FOUND'], 404);
      }
      logger.info(`Usuário obtido por ID: ${JSON.stringify(user)}`);
      return res.status(200).json(user);
    } catch(error) {
      if (error.code === 403) {
        logger.error(`Usuário não autorizado a acessar a rota: ${error.message}`);
      } else {
        logger.error(`Erro ao obter usuário por ID: ${error.message}`);
      }
      throw new CustomError(ERROR_MESSAGES['USER_NOT_FOUND'], 404);
    }
  },
};

export default UserController;
