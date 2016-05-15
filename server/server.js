import express from 'express';
import mongoose from 'mongoose';
import conf from './config/config.json'

const port = 3000;
const app = express();
app.use(express.static('public'));
mongoose.connect(conf.mongoDbURI);

import viewEngine from './config/viewEngine';
viewEngine(app);

import applyPreRouteMiddleware from './middleware/preRoute';
applyPreRouteMiddleware(app);


import { applyApiRoutes, applyAppRoutes } from './routes';
applyApiRoutes(app);
applyAppRoutes(app);


import applyPostRouteMiddleware from './middleware/postRoute';
applyPostRouteMiddleware(app);

// Start server
app.listen(port);
console.log('Server is listening on port ' + port );
