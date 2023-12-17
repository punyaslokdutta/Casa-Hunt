

var express = require('express');
var propertyController = require('../controllers/property.js');


var router = express.Router();

router.get('/get/:id', propertyController.getProperty);
router.get('/get', propertyController.getProperties);

module.exports = router;
