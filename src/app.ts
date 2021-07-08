import * as dotenv from 'dotenv';
import express from 'express';
import Logger from './utils/logger';
import loggerMiddleware from './middlewares/logger.middleware';

const app = express();
dotenv.config();

app.use(loggerMiddleware);

if (!process.env.PORT) {
  process.exit(0);
}

app.get('/logger', (_, res) => {
  Logger.error('This is an error log');
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a api log');
  Logger.debug('This is a debug log');

  res.send('Hello world');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started running on port ${process.env.PORT}`);
});
