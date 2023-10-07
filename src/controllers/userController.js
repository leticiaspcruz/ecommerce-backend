import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../dao/models/userSchema.js';
import dotenv from 'dotenv';

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
      res.status(500).json({ error: error.message });
    }
  },
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }
  
      const token = user.generateAuthToken();
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter usuários' });
    }
  },
  async getUserById(req, res) {
    const { userId } = req.params;
    try { 
      const user = await User.findById(userId);
      return res.status(200).json(user)
    } catch(error) {
      return res.status(400).send(error);
    } 
  },
}

export default UserController;
