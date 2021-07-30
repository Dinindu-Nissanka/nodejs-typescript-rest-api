import * as dotenv from 'dotenv';
import express from 'express';
import Logger from './utils/logger';
import { loggerMiddleware, errorHandlerMiddleware } from './middlewares';
import connect from './db/connect';
import routes from './routes';

const app = express();
dotenv.config();

app.use(loggerMiddleware);

if (!process.env.PORT) {
  process.exit(0);
}

app.use(express.json());
app.use('/api/v1', routes);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  Logger.info(`Server started running on port ${process.env.PORT}`);
  connect();
});
