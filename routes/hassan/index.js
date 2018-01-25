var express = require('express');
var router = express.Router();
var fs = require('fs');
var obj = require("../../scrapper/airports.json");
var _ = require('lodash');
var scrapper = require('../../scrapper/index');
var crawler = require('../../crawler/index');
var Crawler = require('simplecrawler');
var url = require("url");
var urlvol = "";

/* GET home page. */
router.post('/', function(req, res, next) {

  /* var voyage = {
       depart :req.body.vdepart,
       arrivee :req.body.varrive

   }*/
  console.log("walou");
  var voyage = {

       depart :req.body.depart,
      arrivee :req.body.arrive
   }
   var  date_dep = req.body.daterange ;
    console.log("la date",date_dep);


    var villedep =  _.find(obj.koko, ['city', voyage.depart]);
    var villearr=  _.find(obj.koko, ['city', voyage.arrivee]);

    var vols ;


    var dep = villedep.city+" - "+villedep.name+"("+villedep.iata+"),"//+villedep.country ;
    var arr = villearr.city+" - "+villearr.name+"("+villearr.iata+")," //+villearr.country ;
    var departure =dep.replace(/ /g, '+');
    var arrivee = arr.replace(/ /g, '+');

     urlvol ="https://www.tripsta.com/airline-tickets/results?dep="+escape(departure)+"+&arr="+escape(arrivee)+"+&isRoundtrip=1&obDate=01%2F25%2F2018&ibDate=02%2F20%2F2018&obTime=&ibTime=&extendedDates=0&resetStaticSearchResults=1&passengersAdult=1&passengersChild=0&passengersInfant=0&airlineCode=&class=&directFlightsOnly=0";
   console.log(urlvol);

    var myCrawler = Crawler(urlvol);

    myCrawler.on("crawlstart", function() {
        console.log("Crawler started!");
    });


    myCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {

          scrapper.extractData(responseBuffer,function (vols) {

              console.log("vols",vols);
        return res.json({key:vols});


          });

    });
    myCrawler.start();
 //  res.json({key:[{"aaa":"eeee"},{"aaa":"qqqq"},{"aaa":"zzzzz"}]});



});

module.exports = router;