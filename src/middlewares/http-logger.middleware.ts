import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HTTPLoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      this.logger.log(`HTTP request ${req.method} ${req.originalUrl} [${res.statusCode}]`);
    });

    next();
  }
}
