import consolidate from 'consolidate';
import path from 'path';

const apply = (app) => {
	app.engine('html', consolidate.handlebars)
	app.set('view engine', 'html');
	app.set('views', path.resolve(__dirname, '../view-templates'));
};

export default apply;
