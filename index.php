

<script src="https://cdn.netpie.io/microgear.js"></script>

<script>

  const APPID = "TrainingNP";
  const KEY = "1ac3oAVUv2s6j4H";
  const SECRET = "cCNe8AFEJcYibPRAfqwU4N4xc";

  const ALIAS = "Server1";     
  const thing1 = "NodeMCU1";                                   

  function switchPress(logic){
    if(logic == 1 ){
      microgear.chat(thing1,"ON");
    }else if(logic == 0 ){
      microgear.chat(thing1,"OFF");
    }
  }

  var microgear = Microgear.create({
    key: KEY,
    secret: SECRET,
    alias : ALIAS
  });


  microgear.on('message', function(topic,data) {
    if(data=="ON"){
      document.getElementById("Status").innerHTML =  "Load is ON.";
    }else if(data=="OFF"){
      document.getElementById("Status").innerHTML =  "Load is OFF."; 
    }
  });

  microgear.on('connected', function() {
    microgear.setAlias(ALIAS);
    document.getElementById("connected_NETPIE").innerHTML = "Connected to NETPIE"
  });

  microgear.on('present', function(event) {
    console.log(event);
  });

  microgear.on('absent', function(event) {
    console.log(event);
  });

  microgear.resettoken(function(err) {
    microgear.connect(APPID);
  });

</script>
<center>
  <h1 id="connected_NETPIE"></h1>
  <button type="button" onclick="switchPress(1)">Turn ON</button>
  <button type="button" onclick="switchPress(0)">Turn OFF</button>
  <p><strong id="Status">Load is OFF.</strong></p>
</center>
