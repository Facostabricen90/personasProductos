const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

/*
    * @route GET /customer
    * @desc Get all customers
    */    

router.get('/', CustomerController.homepage);


module.exports = router;
