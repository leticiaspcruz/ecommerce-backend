
class MessagesManager {
  constructor() {}

  async createMessage(sender, content) {

    const { Message } = require('./models/messageSchema');

    try {
      const message = new Message({
        sender,
        content,
      });
      await message.save();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error('Erro ao criar a mensagem'));
    }
  }

  async getAllMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      return Promise.reject(new Error('Erro ao obter as mensagens'));
    }
  }
}

export default MessagesManager;
