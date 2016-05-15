import errorHandler from '../config/errorHandler';

const apply = (app) => {
	app.use(errorHandler);
};

export default apply;
