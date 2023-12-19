

var express = require('express');
var propertyController = require('../controllers/property.js');


var router = express.Router();

router.get('/:id', propertyController.getProperty);
router.get('/', propertyController.getOrFilterProperties);

module.exports = router;
