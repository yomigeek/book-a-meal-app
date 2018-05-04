import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config';

const router = express.Router();

// This function verifies the token via the response header or body token
export function verifyToken(req, res, next) {
  const token = req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, (error, decoded) => {
      if (error) {
        return res.status(401).send(error);
      }
      res.decoded = decoded;
      return next();
    });
  } else {
    res.redirect(401, '/');
  }
}

export default router;
