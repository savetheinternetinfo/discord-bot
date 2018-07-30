const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json"))

client.on('ready', () => {
  console.log(`Angemeldet als: ${client.user.tag}`);
});

client.on('message', msg => {

  var content = msg.content,
      author  = msg.author,
      chan    = msg.channel,
      log     = config.log;
  
  if (author.id != client.user.id && content.startsWith(config.prefix)) {
    let command = content.substr(1, content.length -1).split(" ")[0];

    if(content.split(' ')[1]) {
      let user = content.split(' ')[1];
      switch(command) {
        case "slap":
          chan.send("*slaps "+  +" around a bit with a large trout*");
          break;
        case "kaffee":
          chan.send("*serviert "+ user +" einen frisch gebrühten Kaffee aus aromatisch hochwertigen und laktosefreien Kaffeebohnen, die nach dem Vorbild der kolonisierten Ausbeutung herangewachsen und importiert worden sind; Prost!*");
          break;
        case "bier":
          chan.send("*schenkt ein kühles Blondes an "+ user +" aus.*");
          break;
        case "kiss":
          chan.send("*" + author +", (づ｡◕‿‿◕｡)づ 。。・゜゜・。。・゜:heart: "+ user +" :heart:*");
          break;
        case "hug":
          chan.send("*" + author +", ♡:heart:♡:hearts: "+ user +" :hearts:♡:heart:♡:hearts:*");
          break;
        case "döner":
          chan.send("*Döner für "+ user +" auf "+ author +"s Nacken!*");
          break;
        case "hawaiipizza":
          chan.send("*blickt verschämt auf die Hawaiipizza und übergibt diese an "+ user +".*");
          break;
        case "fiege":
          chan.send("*reicht "+ user +" ein kühles Fiege Bier und genießt zusammen mit ihm das Plopp.*");
          break;
        case "umtrunk":
          let bier = content.split(' ')[2];
          chan.send("*teilt mit "+ user +" ein kühles "+ bier +" und genießt diesen Moment inning.*");
          break;
      }
    }
  }
});
client.login(config.token);
