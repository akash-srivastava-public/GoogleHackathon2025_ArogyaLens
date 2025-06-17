import { Request, Response, NextFunction } from 'express';

export const asyncCatch = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // pass error to Express error handler
  };
};
