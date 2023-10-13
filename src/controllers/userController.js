import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../dao/models/userSchema.js';
import dotenv from 'dotenv';
import { ERROR_MESSAGES } from '../constants.js';
import CustomError from '../services/customError.js';

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
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // O número 10 é o custo de hashing
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
      throw new CustomError(ERROR_MESSAGES['INVALID_USER_DATA'], 400);
    }
  },

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !user.comparePassword(password)) {
        throw new CustomError(ERROR_MESSAGES['INVALID_CREDENTIALS'], 401);
      }
  
      const token = user.generateAuthToken();
      res.json({ token });
    } catch (error) {
      throw new CustomError(ERROR_MESSAGES['INVALID_USER_DATA'], 400);
    }
  },

  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      console.error(error);
      throw new CustomError(ERROR_MESSAGES['USER_NOT_FOUND'], 404);
    }
  },

  async getUserById(req, res) {
    const { userId } = req.params;
    try { 
      const user = await User.findById(userId);
      if (!user) {
        throw new CustomError(ERROR_MESSAGES['USER_NOT_FOUND'], 404);
      }
      return res.status(200).json(user)
    } catch(error) {
      throw new CustomError(ERROR_MESSAGES['USER_NOT_FOUND'], 404);
    } 
  },
}

export default UserController;
