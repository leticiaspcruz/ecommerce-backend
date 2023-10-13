import Message from '../dao/models/messageSchema.js';
import { ERROR_MESSAGES } from '../constants.js';
import CustomError from '../services/customError.js';
import logger from '../utils/logger.js'; 

const MessageController = {
  createMessage: async (req, res) => {
    try {
      const { sender, content } = req.body;
      const newMessage = await Message.create({ sender, content });
      logger.info(`Nova mensagem criada: ${JSON.stringify(newMessage)}`);
      res.status(201).json(newMessage);
    } catch(error) {
      logger.error(`Erro ao criar mensagem: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['INVALID_MESSAGE'], 400);
    }
  },

  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.find();
      logger.info(`Todas as mensagens obtidas: ${JSON.stringify(messages)}`);
      res.status(200).json(messages);
    } catch(error) {
      logger.error(`Erro ao obter todas as mensagens: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['INVALID_MESSAGE'], 400);
    }
  },
};


export default MessageController;