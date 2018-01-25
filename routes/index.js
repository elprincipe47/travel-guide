
var express = require('express');
//var jsonQuery = require('json-query')

var router = express.Router();
var fs = require("fs");
//var airports = require('airport-codes');
//var jsonQuery = require('json-query');



var crawler = require('../crawler/index');
var scrapper = require('../scrapper/index')
/* GET home page. */
router.get('/', function(req, res, next) {

    // res.render('hassan', { title: 'express' });
    res.render('index', { title: 'voyage' });



});

module.exports = router;
