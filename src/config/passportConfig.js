import passport from 'passport';
import local from 'passport-local'
import { User } from '../dao/models/userSchema';
import { createHash, isValidPassword } from '../utils/utils';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { firstName, lastName, age, email } = req.body;
            try {
                let user = await User.findOne({ email: username });
                if (user) {
                    return done(null, false, { message: 'Email já cadastrado' });
                }
                let newUser = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    age: age,
                    password: createHash(password)
                }
                let result = await User.create(newUser);
                return done(null, result);
            } catch (error) {
                return done(`Erro ao obter o usuario ${error}`);
            }
        }
    ))

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username })
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                return done(null, false);
            }
            return done(null, user);
        } catch(error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await User.findById(id);
        done(null, user)
    });
};

export default initializePassport;