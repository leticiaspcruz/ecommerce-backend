import Message from '../dao/models/messageSchema.js';
import { ERROR_MESSAGES } from '../constants.js';
import CustomError from '../services/customError.js';

const MessageController = {
  createMessage: async (req, res) => {
    try {
      const { sender, content } = req.body;
      const newMessage = await Message.create({ sender, content });
      res.status(201).json(newMessage);
    } catch(error) {
      console.error(error);
      throw new CustomError(ERROR_MESSAGES['INVALID_MESSAGE'], 400);
    }
  },

  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.find();
      res.status(200).json(messages);
    } catch(error) {
      console.error(error);
      throw new CustomError(ERROR_MESSAGES['INVALID_MESSAGE'], 400);
    }
  },
};

export default MessageController;