import express from 'express';
import MessagesManager from '../dao/messagesManager.js';

const router = express.Router();
const messagesManager = new MessagesManager();
const messageRoute = '/messages';

router.post(`${messageRoute}`, (req, res) => {
  const { sender, content } = req.body;

  messagesManager.createMessage(sender, content)
    .then(() => {
      res.status(201).json({ message: 'Mensagem enviada com sucesso' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get(`${messageRoute}`, (req, res) => {
  messagesManager.getAllMessages()
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

export default router;
