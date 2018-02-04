var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
    var q = req.query.q;
    console.log("q is:"+q);
    superagent.get(q)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      //res.send(sres.text);
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.leftBox .list-img').each(function (idx, element) {
        var $element = $(element);
        items.push({
          //title: $element.attr('title'),
          href: $element.find(".list-info-title").attr('href'),
          info: $element.find(".list-info-title").text(),
          price: $element.find(".price").text(),
          priceunit: $element.find(".price-unit").text(),
          area: $element.find(".area").text()
        });
      });
     var data="";
     for (x in items){
	data=data+items[x].href+" "+items[x].info+" "+items[x].price+" "+items[x].priceunit+items[x].area+"\n";
	}
      res.send(data);
    });
});


app.listen(4000, function () {
  console.log('app is listening at port 3000');
});
