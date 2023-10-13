import CustomError from '../services/customError.js';
import { ERROR_MESSAGES } from '../constants.js';

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const mensagemDoErro = ERROR_MESSAGES[err.message] || 'Erro desconhecido';
    res.status(err.statusCode).json({ error: mensagemDoErro });
  } else {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export default errorHandlerMiddleware;
