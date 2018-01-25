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
var request = require('request');
var cheerio = require('cheerio');


/* GET home page. */
router.post('/', function(req, res, next) {

  /* var voyage = {
       depart :req.body.vdepart,
       arrivee :req.body.varrive

   }*/
  console.log("walou");
  var voyage = {

       depart :req.body.depart,
      arrivee :req.body.arrive ,
      date_depart  :req.body.date_depart,
      date_arrive : req.body.date_arrive
   }
 //  var  date_dep = req.body.daterange ;
    console.log("la date",voyage.date_depart);


    var villedep =  _.find(obj.koko, ['city', voyage.depart]);
    var villearr=  _.find(obj.koko, ['city', voyage.arrivee]);

    var vols ;


    var dep = villedep.city+" - "+villedep.name+"("+villedep.iata+"),"//+villedep.country ;
    var arr = villearr.city+" - "+villearr.name+"("+villearr.iata+")," //+villearr.country ;
    var departure =dep.replace(/ /g, '+');
    var arrivee = arr.replace(/ /g, '+');
    var date_dep = voyage.date_depart.replace("/","%2F");
    var date_arr = voyage.date_arrive.replace("/","%2F");

    // urlvol ="https://www.tripsta.com/airline-tickets/results?dep="+escape(departure)+"+&arr="+escape(arrivee)+"+&isRoundtrip=1&obDate=01%2F25%2F2018&ibDate=02%2F20%2F2018&obTime=&ibTime=&extendedDates=0&resetStaticSearchResults=1&passengersAdult=1&passengersChild=0&passengersInfant=0&airlineCode=&class=&directFlightsOnly=0";
    urlvol ="https://www.tripsta.com/airline-tickets/results?dep="+escape(departure)+"+&arr="+escape(arrivee)+"+&isRoundtrip=1&obDate="+date_dep+"&ibDate="+date_arr+"&obTime=&ibTime=&extendedDates=0&resetStaticSearchResults=1&passengersAdult=1&passengersChild=0&passengersInfant=0&airlineCode=&class=&directFlightsOnly=0";

    console.log(urlvol);
/*
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
    myCrawler.start();*/
 //  res.json({key:[{"aaa":"eeee"},{"aaa":"qqqq"},{"aaa":"zzzzz"}]});

   request(urlvol, function(error, response, html) {


        if (!error) {
            var nosvols = [];
            var $ = cheerio.load(html);




            //var prix = $('div.od-resultpage-price-text-without-discountod-diff-btw-prices-box.price_label.non_membership_price_container');
            $('div.fare').each(function (i,element) {
                var prix = $(this).children('form').children('div.leg-title.depart-title').children('table.depart').children('tbody').children('tr').children('td.price.right.relative.ab-v2').children('span.amount');
                var  prixo = prix.text().replace(/\s+/g, " ");
                var depart = $(this).children('form').children('div.leg.clearfix.outbound').children('table.segments').children('tbody').children('tr.segment.selected');
                var numvoldepart = $(depart).children('td.first.flight.quiet').children('span');
                var hdepart = $(depart).children('td.time.depart').children('span');
                var harriv = $(depart).children('td.time.arrive').children('span');
                var header = $(this).children('form').children('div.leg.clearfix.outbound').children('table.header').children('tbody').children('tr');
                var aerodep =$(header).children('td.depart.airoport').children('div.airoport-name');
                var aerrive = $(header).children('td.arrive.airoport').children('div.airoport-name');
                var companie =  $(this).children('form').children('div.leg-title.depart-title').children('table.depart').children('tbody').children('tr').children('td').children('div.airline-logo').children('img').attr('alt');
                var numvolarrive = $(this).children('form').children('div.leg.clearfix.inbound').children('table.segments').children('tbody').children('tr.segment.selected').children('td.first.flight.quiet').children('span');
                var hdepart_arrivee = $(this).children('form').children('div.leg.clearfix.inbound').children('table.segments').children('tbody').children('tr.segment.selected').children('td.time.depart');
                var harrv_arrivee = $(this).children('form').children('div.leg.clearfix.inbound').children('table.segments').children('tbody').children('tr.segment.selected').children('td.time.arrive').children('span.cursor_default');
                var duree_arrive = $(this).children('form').children('div.leg.clearfix.inbound').children('table.segments').children('tbody').children('tr.segment.selected').children('td.duration.quiet').children('span');
                var aero_depart_retour = $(this).children('form').children('div.leg.clearfix.inbound').children('table.header').children('tbody').children('tr').children('td.depart.airport').children('div.airport-name');
                var aero_arriv_retour = $(this).children('form').children('div.leg.clearfix.inbound').children('table.header').children('tbody').children('tr').children('td.arrive.airport').children('div.airport-name');
                var duree_depart = $(this).children('form').children('div.leg.clearfix.outbound').children('table.segments').children('tbody').children('tr.segment.selected').children('td.duration.quiet').children('span');
                var companie_retour =  $(this).children('form').children('div.leg-title.arrival-title').children('table.arrival').children('tbody').children('tr').children('td').children('div.airline-logo').children('img').attr('alt');
                var aero_arr_arr = $(this).children('form').children('div.leg.clearfix.outbound').children('table.header').children('tbody').children('tr').children('td.arrive.airport').children('div.airport-name');
                var aero_depart_allee= $(this).children('form').children('div.leg.clearfix.outbound').children('table.header').children('tbody').children('tr').children('td.depart.airport').children('div.airport-name');
                var lien = "https://www.tripsta.com" +$(this).children('form').attr('action');

                var metadata = {
                    prix: prixo,
                    title : ""
                }

                vol = {
                    allee : {

                        numvol : numvoldepart.text().replace(/\s+/g, " "),
                        heuredepart :hdepart.text().replace(/\s+/g, " ") ,
                        heurearrivee :harriv.text().replace(/\s+/g, " ") ,
                        dureevol :duree_depart.text().replace(/\s+/g, " "),
                        aeroport_depart : aero_depart_allee.text().replace(/\s+/g, " "),
                        aeroport_arrivee :aero_arr_arr.text().replace(/\s+/g, " "),
                        companie : companie
                    },
                    retour :{
                        compagnie :companie_retour,
                        numvol : numvolarrive.text().replace(/\s+/g, " "),
                        heuredepart :hdepart_arrivee.text().replace(/\s+/g, " "),
                        heurearrivee :harrv_arrivee.text().replace(/\s+/g, " "),
                        dureevol :duree_arrive.text().replace(/\s+/g, " "),
                        aeroport_depart :aero_depart_retour.text().replace(/\s+/g, " ") ,
                        aeroport_arrivee :aero_arriv_retour.text().replace(/\s+/g, " ")
                    },
                    prix  : prixo,
                    lien  : lien


                }
                if(prixo !== " " && prixo !== "" && prixo !== null )
                {
                    nosvols.push(vol);
                }

            })//end loop de recherche
        }
       res.json({key:nosvols});

    });
   // res.json({key:nosvols});

});

module.exports = router;