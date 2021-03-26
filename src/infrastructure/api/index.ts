import express from 'express';

const app = express();

const router = express.Router();

const { API_VERSION } = process.env;

/**
 * Define routing and route level middleware if necessary from ./routes
 * (GET) http://localhost:3009/<stage>/v1/template/
 * (POST) http://localhost:3009/<stage>/v1/template/:id/something
 */
router.get('/', (_, res, next) => {
  res.send('ok');
  next();
});

router.post('/:id/something', (_, res, next) => {
  res.send('ok');
  next();
});

app.use('/template', router);

/**
 * Debug router before we start proxying  requests from /v<x> path
 * http://localhost:3009/<stage>/version
 */
app.get('/version', (_, res) => {
  res.send({ version: API_VERSION });
});

// Serverless lambda invocation debug route - local/database/base-path.json
app.get('/', (_, res) => {
  res.send({ ok: true });
});

export { app };
