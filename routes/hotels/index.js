var Crawler = require('simplecrawler');
var url = require('url');
var cheerio = require('cheerio');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var obj = require("../../scrapperhotel/airports.json");
var _ = require('lodash');
var scrapper = require('../../scrapperhotel/index');
var request = require('request');

router.post('/', function(req, res, next) {

    var heb = {

        city :req.body.city,
        country :req.body.country ,
        date_depart  :req.body.date_depart,
        date_arrive : req.body.date_arrive
    }
    //  var  date_dep = req.body.daterange ;
    console.log("la date",heb.date_depart);


    var villedep =  _.find(obj.koko, ['city', heb.city]);
    var pays=  _.find(obj.koko, ['country', heb.country]);
    var noshotels = [] ;
    var url ="http://www.hostels.com/"+heb.city+"/"+heb.country+"?dateFrom="+heb.date_depart+"&dateTo="+heb.arrive+"&guestCount=1&homepageSearchType=dropdown";
       console.log(url);
    request(url, function(error, response, html){


        if(!error) {

            var $ = cheerio.load(html);
              var hotels= [];
            $('div.fablisting.rounded').filter(function () {
                var nom = $(this).children('ul').children('li.description').children('h2').children('a').text();
                var lien =  $(this).children('ul').children('li.description').children('h2').children('a').attr('href');
                var prix =  $(this).children('ul').children('li.pricing').children('ul').children('li').children('span.price').children('a').first().text();
               var location =  $(this).children('ul').children('li.description').children('div.location').text();
               var desc = $(this).children('ul').children('li.description').children('p');
               var description = $(desc).remove('a').text().trim().replace("\n                    Plus d\'info »","");
                var rating =  $(this).children('ul').children('li.description').children('div.rating').children('span').children('a').text();
                var image = $(this).children('ul').children('li.image').children('a').children('img').attr('src');
               var hotel = {
                   nom : nom,
                   lien : lien,
                   prix  :prix,
                   location : location,
                   description : description,
                   image : image,
                   rating :rating
               }
                hotels.push(hotel);


            })
           // });
        }
        res.json(hotels.slice(0, -1));
    });


 //res.render('hotels', { title: 'voyage' });




});

module.exports = router;