var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  fileRead = fs.readFileSync("./public/json/data.json");
  data = JSON.parse(fileRead);
  console.log(data);
  data.sort(function(a,b){
    if(a.index == b.index)
      return 0;
    else if(a.index > b.index)
      return 1;
    else
      return -1;
  });
  res.render('index', data);
});

module.exports = router;
