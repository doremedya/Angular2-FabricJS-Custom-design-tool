const User = require('../controllers/user');

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcomee to the API!',
	}));

	app.post('/api/user', User.create);
	app.put('/api/user/:userId', User.update);
	app.get('/api/user', User.list);
	app.get('/api/user/:userId', User.getOne);
	app.delete('/api/user/:userId', User.remove);
}
