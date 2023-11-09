import Ticket from '../dao/models/ticketSchema.js';
import { ERROR_MESSAGES } from '../constants.js';
import CustomError from '../services/customError.js';
import logger from '../utils/logger.js'; 

const TicketController = {
  async createTicket(req, res) {
    const { orderId, customerEmail, purchase, cart } = req.body;
    try {
      const newTicket = new Ticket({
        orderId,
        customerEmail,
        purchase,
        cart,
      });
      const savedTicket = await newTicket.save();
      logger.info(`Ticket criado com sucesso: ${JSON.stringify(savedTicket)}`);
      return res.status(200).json(savedTicket);
    } catch (error) {
      logger.error(`Erro ao criar ticket: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['INVALID_TICKET_DATA'], 400);
    }
  },
  
  async getTickets(req, res) {
    try {
      const tickets = await Ticket.find();
      logger.info(`Todos os tickets obtidos: ${JSON.stringify(tickets)}`);
      return res.status(200).json(tickets);
    } catch (error) {
      logger.error(`Erro ao obter tickets: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['TICKET_NOT_FOUND'], 404);
    }
  },

  async getTicketById(req, res) {
    const { ticketId } = req.params;
    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        throw new CustomError(ERROR_MESSAGES['TICKET_NOT_FOUND'], 404);
      }
      logger.info(`Ticket obtido por ID: ${JSON.stringify(ticket)}`);
      return res.status(200).json(ticket);
    } catch (error) {
      logger.error(`Erro ao obter ticket por ID: ${error.message}`);
      throw new CustomError(ERROR_MESSAGES['TICKET_NOT_FOUND'], 404);
    }
  },
};

export default TicketController;