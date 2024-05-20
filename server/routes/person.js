const express = require('express');
const router = express.Router();
const PersonController = require('../controllers/personController');
const morgan = require('morgan');

router.get('/', morgan('tiny') , PersonController.pagePerson);

module.exports = router;