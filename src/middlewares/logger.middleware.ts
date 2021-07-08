import morgan, { StreamOptions } from 'morgan';

import Logger from '../utils/logger';

const stream: StreamOptions = {
  write: (message: string) => Logger.http(message),
};

const loggerMiddleware = morgan(
  ':method :url :status :req[body] :response-time ms',
  { stream }
);

export default loggerMiddleware;
