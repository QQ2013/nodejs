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
      $('.listBox .list-info-title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          //title: $element.attr('title'),
          title: $element.text(),
          href: $element.attr('href')
        });
      });
     var data="";
     for (x in items){
	data=data+items[x].title+" "+items[x].href+"\n";
	}
      res.send(data);
    });
});


app.listen(4000, function () {
  console.log('app is listening at port 3000');
});
