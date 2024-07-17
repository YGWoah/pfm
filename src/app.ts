import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import indexRouter from './routes/index';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import categorieRouter from './routes/categorie';
import articleRouter from './routes/article';
import commentRouter from './routes/comment';
import { authenticate } from './middleware/authenticate';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
    this.errorHandler();
    this.checkDatabaseConnection();
  }

  private config() {
    this.app.use(logger('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(
      express.static(path.join(__dirname, '../frontend', 'build'))
    );
  }

  private routerSetup() {
    // this.app.use('/', indexRouter);
    this.app.get('/', (req, res) => {
      console.log(__dirname);
      res.sendFile(
        path.join(__dirname, '../frontend', 'build', 'index.html')
      );
    });
    // this.app.use(authenticate);
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/users', authenticate, usersRouter);
    this.app.use('/api/categorie', authenticate, categorieRouter);
    this.app.use('/api/article', authenticate, articleRouter);
    this.app.use('/api/comment', authenticate, commentRouter);
  }

  private checkDatabaseConnection() {
    const prisma = new PrismaClient();
    prisma
      .$connect()
      .then(() => {
        console.log('Database connection is set');
      })
      .catch((err: any) => {
        console.log('Database connection failed');
        console.log(err);

        console.log('...');
      });

    console.log('Checking database connection...');
  }
  private errorHandler() {
    this.app.use(
      (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
    );
  }
}

export default new App().app;
