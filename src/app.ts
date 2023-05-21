import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import categorieRouter from './routes/categorie';
import articleRouter from './routes/article';
import commentRouter from './routes/comment';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
    this.errorHandler();
  }

  private config() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  private routerSetup() {
    this.app.use('/', indexRouter);
    this.app.use('/auth', authRouter);
    this.app.use('/users', usersRouter);
    this.app.use('/categorie', categorieRouter);
    this.app.use('/article', articleRouter);
    this.app.use('/comment', commentRouter);
  }

  private errorHandler() {
    // Error handling middleware function
    this.app.use(
      (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        // Custom error handling logic
        // You can send an appropriate response based on the error
        console.log(err);
        res.status(500).json({ error: err.message });
      }
    );
  }
}

export default new App().app;
