import express from 'express';
import winston from 'winston';

const app = express();
app.use(express.static('public'));

import viewEngine from './config/viewEngine';
viewEngine(app);

import applyPreRouteMiddleware from './middleware/preRoute';
applyPreRouteMiddleware(app);

import applyRoutes from './routes';
applyRoutes(app);

import applyPostRouteMiddleware from './middleware/postRoute';
applyPostRouteMiddleware(app);

const port = process.env.PORT
app.listen(port)
winston.info('Server is listening on port ' + port);

export default app;
