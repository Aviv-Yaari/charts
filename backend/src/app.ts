import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import authRoutes from './api/auth/auth.routes';
import pointRoutes from './api/point/point.routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expressSession from 'express-session';
import { logger } from './services/logger.service';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { ExpressError } from './services/error.service';

const app = express();
const port = process.env.PORT || 3030;

//#region middlewares:
app.use(loggerMiddleware);
app.use(express.json());
dotenv.config();
const session = expressSession({
  secret: process.env.SESSION_SECRET || 'some secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 },
});
app.use(session);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions: CorsOptions = {
    credentials: true,
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
  };
  app.use(cors(corsOptions));
}

//#region DB:
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxpry.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbUrl);

//#region Routes:
app.use('/api/auth', authRoutes);
app.use('/api/point', pointRoutes);

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//#region Error handling
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  const { customMessage = 'Unknown error' } = err as ExpressError;
  logger.error(req.method + ' ' + req.path + ' ' + customMessage);
  res.status(statusCode).send({ err: customMessage });
};
app.use(errorHandler);

app.listen(port, () => {
  logger.info('Server is running on port: ' + port);
});
