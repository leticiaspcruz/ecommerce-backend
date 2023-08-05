import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import User from '../dao/models/userSchema.js';

const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.85f64030b26ba9ae',
        clientSecret: '38c0fa67ad1d39a1c5fd71c84b7925896fbddc5d',
        callbackURL: 'http://localhost:8080/api/sessions/github'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await User.findOne({ email: ( profile._json.email ? profile._json.email : profile._json.login ) });
            if (!user) {
                let newUser = {
                    firstName: profile._json.name,
                    email: ( profile._json.email ? profile._json.email : profile._json.login ),
                    lastName: '',
                    age: 99,
                    password: '',
                }
                let result = await User.create(newUser);
                console.log('result:' + result);
                done(null, result);
            }
            else {
                done(null, user);
            }
        }
        catch (error) {
            done(error);
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