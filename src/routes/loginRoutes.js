import { Router } from 'express';
import { User } from '../dao/models/userSchema';
import { createHash } from '../utils/utils.js';
import passport from 'passport';

const router = Router();

router.get('/', async (req, res) => {
    console.log(req.session);
    if (req.session.logged) {
        res.send('Você está logado');
    } else {
        res.send('Faça login para ver essa página');
    }
});

router.post('/recovery', async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user == null) {
            res.status(404)
        } else {
            user.password = createHash(password);
            user.save()
            res.send('Senha alterada com sucesso');
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', passport.authenticate('login', {failureRedirect:'/api/login/failLogin'}) ,async (req, res) => {
    console.log("Login realizado com sucesso");
    if(!req.user){
        return res.status(400).send('Usuario ou senha invalidos');
    }
    res.send('Login realizado com sucesso');
});

router.get('/failLogin', (req, res) => {
    res.status(404).send('Falha no login');
});

export default router;