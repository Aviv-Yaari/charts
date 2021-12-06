import { RequestHandler } from 'express';

export const getRandomPoint: RequestHandler = (req, res) => {
  const num = Math.round(Math.random() * 100);
  res.send({ num });
};
