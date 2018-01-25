var express = require('express');
var router = express.Router();
var obj = require("../../scrapper/airports.json");
var _ = require('lodash');
var scrapper = require('../../scrapper/index');
var crawler = require('../../crawler/index');

//var jsonQuery = require('json-query')

var router = express.Router();
router.get('/', function(req, res, next) {
   var dep = req.query.dep ;
    var arr = req.query.arr ;
    console.log(dep);
    console.log(arr);

    var urlvol =decodeURI("www.tripsta.com/airline-tickets/results?dep="+dep+"&arr="+arr+"&isRoundtrip=1obDate=01%2F25%2F2018&ibDate=02%2F20%2F2018&obTime=&ibTime=&extendedDates=0&resetStaticSearchResults=1&passengersAdult=1&passengersChild=0&passengersInfant=0&airlineCode=&class=&directFlightsOnly=0");


    console.log(urlvol);
   //   scrapper.extractData(urlvol);
    // res.render('hassan', { title: 'express' });
    crawler.crawl(function(content) {
        scrapper.extractData(content);
    },"www.tripsta.com/airline-tickets/results?dep=New+York+-+All+airports+%28NYC%29%2C+&arr=Paris+-+All+airports+%28PAR%29%2C+&isRoundtrip=1&obDate=12%2F28%2F2017&ibDate=12%2F31%2F2017&obTime=&ibTime=&extendedDates=0&resetStaticSearchResults=1&passengersAdult=1&passengersChild=0&passengersInfant=0&airlineCode=&class=&directFlightsOnly=0");
   scrapper.extractData("www.tripsta.com/airline-tickets/results?dep=New+York+-+All+airports+%28NYC%29%2C+&arr=Paris+-+All+airports+%28PAR%29%2C+&isRoundtrip=1&obDate=12%2F28%2F2017&ibDate=12%2F31%2F2017&obTime=&ibTime=&extendedDates=0&resetStaticSearchResults=1&passengersAdult=1&passengersChild=0&passengersInfant=0&airlineCode=&class=&directFlightsOnly=0");
    res.render('crawl', { vol: 'voyage' });



});
module.exports = router;