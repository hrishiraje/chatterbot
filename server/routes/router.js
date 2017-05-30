const router = require('express').Router();
const controllers = require('../controllers/controllers.js');

router.get('/api/response', controllers.robot.responseGet);

router.get('/api/startup', controllers.robot.startup);

router.post('/api/placeOrder', controllers.robot.placeOrder);

router.post('/toppings', controllers.robot.toppings);

module.exports = router;