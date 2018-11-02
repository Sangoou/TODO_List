var express = require('express');
var router = express.Router();
var fs = require("fs");

function compare(a, b) {
  return a.index - b.index;
}

function loadJSON(){
  fileRead = fs.readFileSync("./public/json/data.json");
  return JSON.parse(fileRead);
}

function saveJSON(data){
  fs.writeFile('./public/json/data.json', JSON.stringify(data), 'utf-8', function(e) {
    if (e) {
      console.log(e);
    } else {
      console.log('WRITE DONE!');
    }
  });
}

router.post('/test', function(req, res, next){
  require("date-utils");
  fileRead = fs.readFileSync("./public/json/test.json");
  data = JSON.parse(fileRead);
  var time = new Date();
  time.addMinutes(3);

  data[4].date = time.toFormat("YYYY-MM-DD") + "T" + time.toFormat("HH24:MI");
  data[7].date = time.toFormat("YYYY-MM-DD") + "T" + time.toFormat("HH24:MI");
  time.addMinutes(5);
  data[5].date = time.toFormat("YYYY-MM-DD") + "T" + time.toFormat("HH24:MI");

  res.render('index', data);
  saveJSON(data);
});

router.post('/alarm', function(req, res, next){
  data = loadJSON();
  for(var i = 0; i < data.length; i++){
    if(data[i].index == req.body["alarm"] * 1){
      data[i].alarm = true;
      break;
    }
  }
  res.render('index', data);
  saveJSON(data);
});

router.post('/complete', function(req, res, next){
  data = loadJSON();
  for(var i = 0; i < data.length; i++){
    if(data[i].index == req.body["complete"] * 1){
      data[i].complete = true;
      break;
    }
  }
  res.render('index', data);
  saveJSON(data);
});

router.post('/move', function(req, res, next) {
  arr = req.body["checkList"].split(",");
  data = loadJSON();
  if (req.body["work"] == "remove") {
    for (var i = 0; i < arr.length; i++) {
      index = arr[i] * 1;
      for (var j = 0; j < data.length; j++) {
        if (data[j].index == index) {
          data.splice(j, 1);
          break;
        }
      }
    }
  } else {
    movement = 3;
    before = -5;
    if (req.body["work"] == "up") {
      movement = -3;
    } else {
      arr = arr.reverse();
    }
    for (var i = 0; i < arr.length; i++) {
      index = arr[i] * 1;
      if (Math.abs(before - index) == 2) {
        data.sort(compare);
        for (var j = 0; j < data.length; j++) {
          data[j].index = 2 + j * 2;
        }
      }
      before = index;
      for (var j = 0; j < data.length; j++) {
        if (data[j].index == index) {
          data[j].index = data[j].index + movement;
          break;
        }
      }
    }
  }

  data.sort(compare);

  for (var j = 0; j < data.length; j++) {
    data[j].index = 2 + j * 2;
  }

  res.render('index', data);
  saveJSON(data);
});

router.post('/input', function(req, res, next) {
  data = loadJSON();

  var index = -1;
  for (var i = 0; i < data.length; i++) {
    if (data[i].index == req.body["input_index"]) {
      index = i;
      break;
    }
  }
  if (index != -1) {
    data[index]["title"] = req.body["input_title"];
    data[index]["content"] = req.body["input_content"];
    data[index]["date"] = req.body["input_date"];
  } else {
    data.push({
      "title": req.body["input_title"],
      "content": req.body["input_content"],
      "date": req.body["input_date"],
      "index": 2 + data.length * 2 ,
      "complete": false,
      "alarm": false
    });
  }
  data.sort(compare);
  res.render('index', data);
  saveJSON(data);
});
module.exports = router;
