import express from 'express';

const port = 3000;
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

// Start server
app.listen(port);
console.log('Server is listening on port ' + port );
