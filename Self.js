
let Discord = require("discord.js");
let bot = new Discord.Client();
let config = require('./config.json');

function AaN(args, i) {
  if (args[i] === null || args[i] === "" || args[i] === undefined) return true;
  return false;
}

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`);
  console.log(`${bot.user.username}, your selfbot is online and ready to rock and roll!`)
  console.log(`${bot.user.username}, you're on ${bot.guilds.size} servers with ${bot.channels.size} channels and with ${bot.users.size} users`)
});


bot.on('message', msg => {
  if (msg.author.id !== bot.user.id) return; //Only allows you to work with it, since it's called a selfbot :P

  let prefix = config.prefix;
  let channel = msg.channel;
  let guild = msg.guild;
  let text = msg.content;
  let args = text.split(" ");
  let command = text.substring(prefix.length, args[0].length).toLowerCase();

  if (command == "ping") {
    msg.delete()
    startTime = Date.now();
    channel.sendMessage("Pinging...").then((msg) => {
      endTime = Date.now();
      msg.edit("Pong **➙** *" + Math.round(endTime - startTime) + "* ms");
    });
  }

  if (command == "purge") {
    var amount = parseInt(args[1]);
    msg.channel.fetchMessages({limit: amount})
    .then(messages => {
      messages.map(msg => msg.delete().catch(console.error) );
    }).catch(console.error);
  } else if (command == "p") { //p delets your messages. purge deletes everyones messages.
    let delamount = parseInt(args[1]) ? parseInt(args[1]) : 1;
    msg.channel.fetchMessages({limit: 100})
    .then(messages => {
      msgar = messages.array();
      msgar = msgar.filter(msg => msg.author.id === bot.user.id);
      msgar.length = delamount + 1;
      msgar.map(msg => msg.delete().catch(console.error));
     });
  }
  
    if (command == "get") {
   var user = msg.mentions.users.first();
if (!user) {
var avatar = msg.author.avatarURL;
 msg.channel.sendFile(avatar);
} else {
var userav = msg.mentions.users.first();
var avatar = userav.avatarURL;
msg.channel.sendFile(avatar);
msg.channel.sendMessage("**Beep**")
   }
};  
    //UPTIME
if (msg.content === prefix + "uptime") {
var date = new Date(bot.uptime);
            var strDate = '**';
            strDate += 'Selfbot Uptime\n';
            strDate += date.getUTCDate() - 1 + ' days, ';
            strDate += date.getUTCHours() + ' hours, ';
            strDate += date.getUTCMinutes() + ' minutes, ';
            strDate += date.getUTCSeconds() + ' seconds**';
msg.channel.sendMessage(strDate)
}

    if (msg.content.startsWith(prefix + 'reset')) {
        msg.channel.sendMessage(`***Selfbot Restarting...***`).then(function(t) {
            process.exit(1);
        });
    }


  if (command == "eval") {
          try {
          let code = eval(msg.content.split(" ").slice(1).join(" "));
          channel.sendMessage("**=>** " + code);
        } catch (err) {
          channel.sendMessage("**=>** " + err);
        }
        return;
    }
});


bot.login(config.token);
