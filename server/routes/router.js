const router = require('express').Router();
const controllers = require('../controllers/controllers.js');

router.get('/api/response', controllers.robot.responseGet);

module.exports = router;