import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import User from '../dao/models/userSchema.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env'});

const jwtStrategy = passportJWT.Strategy;
const extractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:  process.env.JWT_SECRET_KEY,
};

passport.use(new jwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

const UserController = {
  async registerUser(req, res) {
    const { name, email, password } = req.body;
    try {
      const newUser = new User({ name, email, password });
      await newUser.save();
      return res.json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
      if (error.code === 11000 && error.keyValue.email) {
        return res.status(400).json({ message: 'O email já está em uso' });
      }
      console.error(error);
      return res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
  },
  async userLogin(req, res) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      console.log(user)
      if (err) {
        return res.status(500).json({ message: 'Erro ao autenticar usuário' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      return res.json({ message: 'Autenticação bem-sucedida', user });
    })(req, res);
  },
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao obter usuários' });
    }
  }  
}

export default UserController;
