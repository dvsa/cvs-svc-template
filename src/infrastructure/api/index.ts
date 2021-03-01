import express from 'express';

const app = express();

const router = express.Router();

const { API_VERSION } = process.env;

// Declare middlewares
/**
 * bodyParser, error handling, logger, etc..
 * http://expressjs.com/en/starter/basic-routing.html
 * http://expressjs.com/en/guide/using-middleware.html
 */

/**
 * app level middlewares
 * app.use('/path', (req, res, next) => {
 * chain middlewares
 * next()
 * })
 */
app.use((req, __, next) => {
  // TODO Add logger lib like Winston or Morgan
  console.log('path');
  console.log(req.path);
  next();
});

/**
 * Define routing and route level middleware if necessary from ./routes
 */
router.post('/', (_, res, next) => {
  res.send('Hello World!');
  next();
});

// Debug router before we start proxying  requests from /v<x> psth
app.get('/', (_, res) => {
  res.send({ ok: true });
});

app.get('/version', (_, res) => {
  res.send({ version: API_VERSION });
});

export { app };
