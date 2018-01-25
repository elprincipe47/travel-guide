var cheerio = require('cheerio');

//var url = "http://www.tripsta.fr/billets-avion/results?dep=Casablanca+-+A%C3%A9roport+Mohammed+V+de+Casablanca+%28CMN%29%2C+Maroc&arr=Paris+-+Tous+les++A%C3%A9roports+%28PAR%29%2C+France&isRoundtrip=1&obDate=29%2F12%2F2017&ibDate=05%2F01%2F2018&obTime=&ibTime=&extendedDates=0&resetStaticSearchResults=1&passengersAdult=1&passengersChild=0&passengersInfant=0&airlineCode=&class=Y&directFlightsOnly=0";


module.exports.extractData = function(html, callback) {



            var $ = cheerio.load(html);
             var noshotels = [];



            //var prix = $('div.od-resultpage-price-text-without-discountod-diff-btw-prices-box.price_label.non_membership_price_container');
            $('div.activities-single').each(function (i,element) {
                var faire = $(this).children('div.col-sm-6').children('div');
               console.log("afaire",faire);
                noshotels.push(faire);
            })
     return callback(noshotels.slice(0,10));


}






