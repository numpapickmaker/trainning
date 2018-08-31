var request = require('request');
var http = require('http'); 
/* http.createServer(function (req, res) {
   // write the code here if it needs to execute every time
   //res.writeHead(200, {'Content-Type': 'text/plain'});
   //res.end("this is a test page");
   

 }).listen(process.env.PORT || 8080,() =>console.log('ok')); */
var express = require("express");
var app     = express();
var path    = require("path");


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.php'));
  //__dirname : It will resolve to your project folder.
});

var MicroGear = require('microgear');
  const APPID     = "TrainingNP";
  const KEY    = "Oly9Tj8Ko4C3TmL";
  const SECRET = "ZEQUms032F6SYxewav91Pcx3N";
  const ALIAS = "backend";
  
var microgear = MicroGear.create({
    key : KEY,
    secret : SECRET,
    alias : ALIAS     
});

microgear.on('connected', function() {
    console.log('Connected...');
    // microgear.setAlias("mygear");
    // setInterval(function() {
    //     microgear.chat('mygear', 'Hello world.');
    // },1000);
});

microgear.on('message', function(topic,body) {
    console.log('incoming : '+topic+' : '+body);
});

microgear.on('closed', function() {
    console.log('Closed...');
});

microgear.on("present", function(event) {
  var obj = event
  console.log(obj);
  var data = {check:'device status', name: obj.alias, status: obj.type };
  //console.log(data);
  console.log(data);
request.post(
    'https://numpapick.herokuapp.com/bot.php',
    { json:  data  },


    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)

        }
    }
);
});

microgear.connect(APPID);
