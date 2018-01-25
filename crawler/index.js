var Crawler = require('simplecrawler');
var url = require('url')
var hassan = require('../routes/hassan/index');
var urlvol = hassan.urlvol ;
module.exports.crawl = function crawl(callback,urlvol) {
    console.log("str",urlvol);
    var myCrawler = Crawler();
        //Crawler.crawl("http://programminglife.io/");

   // var myCrawler = new Crawler("https://www.expedia.fr/Flights-Search?trip=roundtrip&leg1=from%3ACMN%2Cto%3AUberl%C3%A2ndia%2C%20Br%C3%A9sil%20(UDI-Tenente%20Coronel%20Aviador%20C%C3%A9sar%20Bombonato)%2Cdeparture%3A01%2F01%2F2018TANYT&leg2=from%3AUberl%C3%A2ndia%2C%20Br%C3%A9sil%20(UDI-Tenente%20Coronel%20Aviador%20C%C3%A9sar%20Bombonato)%2Cto%3ACMN%2Cdeparture%3A04%2F01%2F2018TANYT&passengers=adults%3A1%2Cchildren%3A0%2Cseniors%3A0%2Cinfantinlap%3AY&mode=search") ;
    var urls = [];


/*
    myCrawler.on("crawlstart", function() {
        console.log("Crawler started!");
    });

    myCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
        callback(responseBuffer);
        //console.log(responseBuffer.toString());

    });

    myCrawler.start();*/
}