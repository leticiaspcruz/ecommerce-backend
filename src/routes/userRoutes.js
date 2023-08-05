import { Router } from 'express';
import User from '../dao/models/userSchema.js';
import passport from 'passport';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', passport.authenticate('register', {failureRedirect:'/failRegister'}) ,async (req, res) => {
    res.send('Usuário criado com sucesso');
});

router.get('/failRegister', (req, res) => {
    res.status(400).send({error: 'Falha ao criar usuário'});
});

export default router;