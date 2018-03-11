var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
    var q = req.query.q;
    console.log("q is:"+q);
    superagent.get("http://baoji.baixing.com/ershoufang/?page="+q)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.main .listing-ad').each(function (idx, element) {
        var $element = $(element);
        items.push({
          price: $element.find(".highlight").text(),
          href: $element.find(".media-cap").attr('href'),
          title: $element.find(".lazyload").attr('alt')
          //title: $element.find("img").attr('alt')
          //title: $element.text()
        });
      });
     var data="";
     for (x in items){
	data=data+items[x].price + "  "+items[x].href+"  "+items[x].title+"\n";
	}
      res.send(data);
    });
});


app.listen(4000, function () {
  console.log('app is listening at port 4000');
});
