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
      res.send(sres.text);
    });
});


app.listen(5000, function () {
  console.log('app is listening at port 5000');
});
