var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
    var q = req.query.q;
    console.log("q is:"+q);
    superagent.get("http://baoji.58.com/ershoufang/?ClickID="+q)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.house-list-wrap li').each(function (idx, element) {
        var $element = $(element);
        items.push({
          price: $element.find(".sum").find('b').text(),
          href: $element.find(".title").find("a").attr('href'),
          //href: $element.find(".media-cap").attr('href'),
          //title: $element.find(".lazyload").attr('alt')
          title: $element.find(".title").find('a').text()
          //title: $element.text()
        });
      });
     var data="";
     for (x in items){
	data=data+items[x].price + "万  "+items[x].href+"  "+items[x].title+"\n";
	//data=data+items[x].title+"\n";
	}
      res.send(data);
    });
});


app.listen(5000, function () {
  console.log('app is listening at port 5000');
});
