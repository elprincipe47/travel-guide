var cheerio = require('cheerio');
var request = require('request');
var Crawler = require('simplecrawler');
//var url = "http://www.tripsta.fr/billets-avion/results?dep=Casablanca+-+A%C3%A9roport+Mohammed+V+de+Casablanca+%28CMN%29%2C+Maroc&arr=Paris+-+Tous+les++A%C3%A9roports+%28PAR%29%2C+France&isRoundtrip=1&obDate=29%2F12%2F2017&ibDate=05%2F01%2F2018&obTime=&ibTime=&extendedDates=0&resetStaticSearchResults=1&passengersAdult=1&passengersChild=0&passengersInfant=0&airlineCode=&class=Y&directFlightsOnly=0";


module.exports.extractData = function(html, callback) {



            var $ = cheerio.load(html);
             var nosvols = [];



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
                    prix  : prixo


                }
                if(vol.prix !== " " || vol.prix !== "" || vol.prix !== null )
                {
                    nosvols.push(vol);
                }

            })
     return callback(nosvols.slice(0,10));
    //nosvols.slice(0,10) ;
    //console.log(nosvols);

}






