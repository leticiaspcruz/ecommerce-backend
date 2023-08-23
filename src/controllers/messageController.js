import Message from '../dao/models/messageSchema.js';

const MessageController = {
  createMessage: async (req, res) => {
    try {
      const { sender, content } = req.body;
      const newMessage = await Message.create({ sender, content });
      res.status(201).json(newMessage);
    } catch(error) {
      console.error(error);
      return res.status(500).json(error);
   }
  },

  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.find();
      res.status(200).json(messages);
    } catch(error) {
      console.error(error);
      return res.status(500).json(error);
    }
  },
};

export default MessageController;