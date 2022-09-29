import { Request, Response, NextFunction } from 'express';
import { Logger } from 'tslog';

export const logger: Logger = new Logger({ name: 'logger' });

const ApiAccessLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { url } = req;
  logger.info(`[API Access] ${url} was visited`);
  next();
};

export default ApiAccessLogger;
