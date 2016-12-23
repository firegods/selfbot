
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

//setInterval(() => {
//bot.channels.get("251881273939722240").sendMessage("@everyone").then(msg =>
//msg.delete())
//}, 60000)

  
  // if (msg.author.id === "243364193263288320") {
      // if (msg.content.indexOf("<@" + bot.user.id + ">") > -1) {
        // let Cleverbot = require('cleverbot-node');
        // cleverbot = new Cleverbot;
        // cleverMessage = msg.content;
        // Cleverbot.prepare(function(){
          // cleverbot.write(cleverMessage, function (response) {
            // setTimeout(function() {
              // bot.channels.get(channel.id);
              // channel.startTyping()
            // }, 1500)
            // setTimeout(function() {
              // channel.sendMessage(msg.author + ", " + response.message);
            // }, 5000)
            // setTimeout(function() {
              // bot.channels.get(channel.id);
              // channel.stopTyping()
            // }, 5200)
          // });
        // });
      // }
    // }
    
    
      // if (msg.author.id === "239440197434081284") {
      // if(msg.channel.id == 252559534898413568)  
// 	var cleverMessage = msg.content.split(' ').splice(1).join(' ');
// 	Cleverbot.prepare(function () {
// 	cleverbot.write(cleverMessage, function (response) {
// 	msg.channel.sendMessage(response.message);
            // setTimeout(function() {
              // bot.channels.get(channel.id);
              // channel.startTyping()
            // }, 1500)
            // setTimeout(function() {
              // channel.sendMessage(msg.author + ", " + response.message);
      //      }, 5000)
            // setTimeout(function() {
        //       bot.channels.get(channel.id);
              // channel.stopTyping()
            // }, 5200)
          // });
        // });
      // }
  
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
var evalcode = msg.content.split(" ").splice(1).join(" ");
		try {
			var evaled = eval(evalcode);
			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);
			msg.channel.sendMessage("Output:\n```x1\n" + clean(evaled) + "```");
		}
		catch (err) {
			msg.channel.sendMessage("Error: " + clean(err));
		}

		function clean(text) {
			if (typeof(text) === "string") {
				return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
			}
			else {
				return text;
			}
		}
    }
    
//     if (command == "hehe") {
//   msg.channel.sendMessage(":thinking:").then((msg) => {
//       msg.edit(":thinking:").then(55000)
//       // msg.edit(":middle_finger:").then(55000)
//       msg.edit(":thinking:").then(55000)
//       msg.edit(":thinking:").then(55000)
//       msg.edit(":middle_finger:").then(55000)
//       msg.edit(":middle_finger:").then(55000)
//       msg.edit(":middle_finger:").then(55000)
//     });
//   }

});



//         try {
//           let code = eval(msg.content.split(" ").slice(1).join(" "));
//           channel.sendMessage("**=>** " + code);
//         } catch (err) {
//           channel.sendMessage("**=>** " + err);
//         }
//         return;
//     }

// });

bot.login(config.token);
