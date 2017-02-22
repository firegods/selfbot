let Discord = require("discord.js"); //npm i discord.js
let bot = new Discord.Client();
let config = require('./config.json');
var moment = require('moment') //npm i moment
var randomcolor = require('randomcolor') //npm i randomcolor
var winston = require('winston'); //npm i winston
var util = require('util') //npm i util



//////////////////////////////////////
//##################################//
//#                                #//
//#         SELFBOT MADE BY        #//
//#         SAMAKI#0037            #//
//#         DISCORD v11            #//
//#                                #//
//##################################//
//////////////////////////////////////




process.on('uncaughtException', function(err) {
    console.log('OMG IT IS A ERROR!: ' + err); //STOPS THE BOT FROM CRASHING
});


function AaN(args, i) {
    if (args[i] === null || args[i] === "" || args[i] === undefined) return true;
    return false;
}

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`);
    console.log(`Guilds: ${bot.guilds.size}`);
    console.log(`Channels: ${bot.channels.size}`);
    console.log(`Users: ${bot.users.size}`);
});

bot.on('message', msg => {
    if (msg.author.id !== bot.user.id) return;

    let prefix = config.prefix;
    let channel = msg.channel;
    let guild = msg.guild;
    let text = msg.content;
    let args = text.split(" ");
    let command = text.substring(prefix.length, args[0].length).toLowerCase();
    if (!msg.content.startsWith(prefix)) return;

    if (command == "ping") {
        msg.delete()
        startTime = Date.now();
        channel.sendMessage("Pinging...").then((msg) => {
            endTime = Date.now();
            msg.edit(`Pong! \`${Math.round(endTime - startTime)}ms\``);
        });
    }

    if (command == "purge") {
        var amount = parseInt(args[1]);
        msg.channel.fetchMessages({
                limit: amount
            })
            .then(messages => {
                messages.map(msg => msg.delete().catch(console.error));
            }).catch(console.error);
    } else if (command == "clear") {
        let delamount = parseInt(args[1]) ? parseInt(args[1]) : 1;
        msg.channel.fetchMessages({
                limit: 100
            })
            .then(messages => {
                msgar = messages.array();
                msgar = msgar.filter(msg => msg.author.id === bot.user.id);
                msgar.length = delamount + 1;
                msgar.map(msg => msg.delete().catch(console.error));
            });
    }
    
    if (msg.content.toLowerCase().startsWith(prefix + 'get')) {
        var userg = msg.mentions.users.first();
        if (!userg) {
            return;
        }
        msg.channel.sendMessage('**Beep**');
        msg.channel.sendFile(userg.avatarURL.split('?')[0]);
    }


    if (msg.content.toLowerCase().startsWith(prefix + 'quote') || msg.content.toLowerCase().startsWith(prefix + 'q')) {
        var quote = msg.content.split(" ").slice(1).join(" ");
        msg.delete();
        if (quote.length < 1) {
            return msg.channel.sendMessage("Please specify a message ID.");
        }
        msg.channel.fetchMessages({
            limit: 1,
            around: quote
        }).then(msgs => {
            const fm = msgs.first();
            msg.channel.sendMessage("", {
                embed: {
                    color: 0x3cb8c9,
                    author: {
                        name: `${fm.author.username} (${fm.author.id})`,
                        icon_url: fm.author.avatarURL
                    },
                    description: fm.content
                }
            });
        });
    }




   if (msg.content === prefix + "stats") {
        var date = new Date(bot.uptime);
        var days = date.getUTCDate() - 1;
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();
        var embed = new Discord.RichEmbed();
        embed.setColor(randomcolor())
            .setFooter(' ', ' ')
            .setThumbnail(`${bot.user.avatarURL}`)
            .setTimestamp()
            .addField('Servers', `${bot.guilds.size}`, true)
            .addField('Users', `${bot.users.size}`, false)
            .addField('Discord Version', `${Discord.version}`, false)
            .addField('Uptime', days + " days, " + hours + " hours and " + minutes + " minutes.")
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
    }
    
    //THIS WILL RESET THE BOT IF YOU RUN A FOREVER JS PROCESS. (LIKE PM2 OR NODEMON)
    if (msg.content.toLowerCase() == prefix + 'r' || msg.content.toLowerCase() == prefix + 'reload') {
        msg.channel.sendMessage(`Restarted. Heartbeat Pong! \`${bot.ping}ms\``).then(function(t) {
            process.exit(1);
        });
    }


    if (command === "eval") {
       try {
           let code = eval(msg.content.split(" ").slice(1).join(" "));
           if (typeof(result) == "object") {
               result = util.inspect(result);
           }
           if (code === null) code = 'null';

           if (code.toString().includes(bot.token) ||
               util.toString().includes(bot.token)) return msg.channel.send('Cannot complete eval due to token.');
           msg.channel.sendCode('js', `${code}`)
       } catch (err) {
           msg.channel.sendCode('js', `${err}`);
       }
   }
	
	
    if (command == "userinfo") {
        var embed = new Discord.RichEmbed();
        if (msg.guild) {
        embed.addField("Username", `${msg.author.username}#${msg.author.discriminator}`, true)
            .addField("ID", `${msg.author.id}`, true)
            .setColor(randomcolor())
            .setFooter(' ', ' ')
            .setThumbnail(`${msg.author.avatarURL}`)
            .setTimestamp()
            .setURL(`${msg.author.avatarURL}`)
            .addField('Currently', `${msg.author.presence.status.toUpperCase()}`, true)
            .addField('Game', `${msg.author.presence.game === null ? "No Game" : msg.author.presence.game.name}`, true)
            .addField('Joined Discord', `${moment(msg.author.createdAt).format('MM.DD.YY')}`, true) 
            .addField('Joined Server', `${moment(msg.member.joinedAt).format('MM.DD.YY')}`, true)
            .addField('Roles', `${msg.member.roles.filter(r => r.name).size}`, true)
            .addField('Is Bot', `${msg.author.bot.toString().toUpperCase()}`, true)
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
        } else {
    embed.addField("Username", `${msg.author.username}#${msg.author.discriminator}`, true)
            .addField("ID", `${msg.author.id}`, true)
            .setColor(randomcolor())
            .setFooter(' ', ' ')
            .setThumbnail(`${msg.author.avatarURL}`)
            .setTimestamp()
            .setURL(`${msg.author.avatarURL}`)
            .addField('Currently', `${msg.author.presence.status.toUpperCase()}`, true)
            .addField('Game', `${msg.author.presence.game === null ? "No Game" : msg.author.presence.game.name}`, true)
            .addField('Joined Discord', `${moment(msg.author.createdAt).format('MM.DD.YY')}`, true)
            .addField('Is Bot', `${msg.author.bot.toString().toUpperCase()}`, true)
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
        }
    }
    
    
    if (msg.content.toLowerCase() === prefix + "serverinfo") {
        var embed = new Discord.RichEmbed();
        embed.addField("Server Name", `${msg.guild.name}`, true)
            .addField("Server ID", `${msg.guild.id}`, true)
            .setColor(randomcolor())
            .setFooter(' ', ' ')
            .setThumbnail(`${msg.guild.iconURL}`)
            .setTimestamp()
            .setURL(`${msg.author.avatarURL}`)
            .addField('Guild Owner', `${msg.guild.owner.user.username}`, true)
            .addField('Owner ID', `${msg.guild.owner.id}`, true)
            .addField('Guild Created', `${moment(msg.guild.createdAt).format('MM.DD.YY')}`, true)
            .addField('Member Count', `${msg.guild.memberCount}`, true)
            .addField('Verification Level', `${msg.guild.verificationLevel}`, true)
            .addField('Region', `${msg.guild.region.toUpperCase()}`, true)
            .addField('Roles', `${msg.guild.roles.filter(r => r.name).size}`, true)
            .addField('Channels', `${msg.guild.channels.filter(r => r.name).size}`, true)
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
    }

    if (command == "whois") {
        var mention = msg.mentions.users.first();
        if (msg.mentions.users.size === 0) {
            return msg.channel.sendMessage(":x: | Please mention a user.")
        }
        var embed = new Discord.RichEmbed();
        embed.addField("Username", `${mention.username}#${mention.discriminator}`, true)
            .addField("ID", `${mention.id}`, true)
            .setColor(randomcolor())
            .setThumbnail(`${mention.avatarURL}`)
            .setURL(`${mention.avatarURL}`)
            .addField('Currently', `${mention.presence.status.toUpperCase()}`, true)
            .addField('Game', `${mention.presence.game === null ? "No Game" : mention.presence.game.name}`, true)
            .addField('Joined Discord', `${moment(mention.createdAt).format('MM.DD.YY')}`, true)
            .addField('Is Bot', `${msg.author.bot.toString().toUpperCase()}`, true)
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
    }
    
    
    if (command == 'embed') {
        let noto = msg.content.split(" ").slice(1).join(" ");
        msg.delete();
        var embed = new Discord.RichEmbed();
        embed.setColor(randomcolor())
            .setDescription(noto)
        msg.channel.sendEmbed(
            embed, {
                disableEveryon: true
            }
        );
    }

    if (msg.content.toLowerCase().startsWith(prefix + "cb")) {
        var cb = msg.content.split(" ").slice(1).join(" ");
        msg.delete();
        msg.channel.sendCode('js', `${cb}`)
    }

    if (command == "friend") {
        if (!msg.mentions.users.first()) return msg.edit('**Friend** > Failed, no user.');

        msg.mentions.users.first().addFriend().then(() => {
            msg.edit("**Friend** > Done");
        })
    }

    if (command == "block") {
        if (!msg.mentions.users.first()) return msg.edit('**Block** > Failed, no user.');

        msg.mentions.users.first().block().then(() => {
            msg.edit("**Person** > Blocked");
        })
    }


    if (command == "unblock") {
        if (!msg.mentions.users.first()) return msg.edit('**Unblock** > Failed, no user.');

        msg.mentions.users.first().unblock().then(() => {
            msg.edit("**Person** > UnBlocked");
        })
    }


    if (command == "unfriend") {
        if (!msg.mentions.users.first()) return msg.edit('**Friend** > Failed, no user.');

        msg.mentions.users.first().removeFriend().then(() => {
            msg.edit("**Removed Friend** > Done");
        })
    }

    if (command == "ban") {
        var user = msg.mentions.users.first();
        var member = msg.guild.member(user);
        var reason = msg.content.split(' ').slice(2).join(' ');
        if (!user)
            return msg.channel.sendMessage('Please include a user to ban.');
        if (!reason)
            return msg.channel.sendMessage('Please include a reason.');
        member.ban().then(() => {
                    var embed = new Discord.RichEmbed();
        embed.setAuthor(`Banned`, ` `)
            .setColor(randomcolor())
            .setDescription(`${msg.author.username}`, true)
            .setThumbnail(`${user.avatarURL}`)
            .setTimestamp()
            .addField('Guild In', `${msg.guild.name}`, true)
            .addField('Reason', `${reason}`, true)
        user.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
            msg.channel.sendMessage(`***${user.username} has been banned.***`)
            var embed = new Discord.RichEmbed();
            embed.setAuthor(`Moderator`, ` `)
                .setColor(randomcolor())
                .setDescription(`${msg.author.username}`, true)
                .setThumbnail(`${user.avatarURL}`)
                .setTimestamp()
                .addField('User Warned', `${user.username}`, true)
                .addField('Reason', `${reason}`, true)
            bot.channels.get(config.logchannel).sendEmbed(
                embed, {
                    disableEveryone: true
                }
            );
        });
    }
    if (command == "warn") {
        var reason = msg.content.split(' ').slice(2).join(' ');
        var user = msg.mentions.users.first();
        if (!user)
            return msg.channel.sendMessage('Please include a user to warn.');
        if (!reason)
            return msg.channel.sendMessage('Please include a reason.');
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`Warning`, ` `)
            .setColor(randomcolor())
            .setDescription(`${msg.author.username}`, true)
            .setThumbnail(`${user.avatarURL}`)
            .setTimestamp()
            .addField('Guild In', `${msg.guild.name}`, true)
            .addField('Reason', `${reason}`, true)
        user.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
        msg.channel.sendMessage(`***${user.username}*** ***Has been warned*** 👌`)
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`Moderator`, ` `)
            .setColor(randomcolor())
            .setDescription(`${msg.author.username}`, true)
            .setThumbnail(`${user.avatarURL}`)
            .setTimestamp()
            .addField('User Warned', `${user.username}`, true)
            .addField('Reason', `${reason}`, true)
        bot.channels.get(config.logchannel).sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
    }
    if (msg.content.startsWith(prefix + 'kick')) {
        var user = msg.mentions.users.first();
        var member = msg.guild.member(user);
        var reason = msg.content.split(' ').slice(2).join(' ');
        if (!user)
            return msg.channel.sendMessage('Please include a user to kick.');
        if (!reason)
            return msg.channel.sendMessage('Please include a reason.');
        member.kick().then(() => {
                var embed = new Discord.RichEmbed();
        embed.setAuthor(`Kicked`, ` `)
            .setColor(randomcolor())
            .setDescription(`${msg.author.username}`, true)
            .setThumbnail(`${user.avatarURL}`)
            .setTimestamp()
            .addField('Guild In', `${msg.guild.name}`, true)
            .addField('Reason', `${reason}`, true)
        user.sendEmbed(
            embed, {
                disableEveryone: true
            }
        ); 
        
           msg.channel.sendMessage(`***${user.username} has been kicked.***`)
            var embed = new Discord.RichEmbed();
            embed.setAuthor(`Moderator`, ` `)
                .setColor(randomcolor())
                .setDescription(`${user.username}`, true)
                .setThumbnail(`${user.avatarURL}`)
                .setTimestamp()
                .addField('User Kicked', `${user.username}`, true)
                .addField('Reason', `${reason}`, true)
            bot.channels.get(config.logchannel).sendEmbed(
                embed, {
                    disableEveryone: true
                }
            );
        });
    }
    	if (msg.content.toLowerCase().startsWith(prefix + "softban")) {
		var firstMention = msg.guild.member(msg.mentions.users.first());
		if(msg.mentions.users.size === 0) {
			return msg.reply("Mention a user to softban.");
		}
		let reason = msg.content.split(" ").splice(2, 30).join(" ");
		if(!firstMention) {
			return msg.reply("Please include a user to ban.");
		}
		if(!reason) {
			return msg.reply("Please include a reason.");
		}
		if(!msg.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
			return msg.channel.send("`ERROR:` I do not have permission to ban.");
		}
		firstMention.ban(1).then(member => {
			msg.guild.unban(firstMention); 
			msg.delete();
			var embed = new Discord.RichEmbed();
        embed.setAuthor(`Soft-banned`, ` `)
            .setColor(randomcolor())
            .setDescription(`${msg.author.username}`, true)
            .setThumbnail(`${user.avatarURL}`)
            .setTimestamp()
            .addField('Guild In', `${msg.guild.name}`, true)
            .addField('Reason', `${reason}`, true)
        user.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );    
           msg.channel.sendMessage(`***${user.username} has been soft-banned.***`)
            var embed = new Discord.RichEmbed();
            embed.setAuthor(`Moderator`, ` `)
                .setColor(randomcolor())
                .setDescription(`${user.username}`, true)
                .setThumbnail(`${user.avatarURL}`)
                .setTimestamp()
                .addField('User Soft-banned', `${user.username}`, true)
                .addField('Reason', `${reason}`, true)
            bot.channels.get(config.logchannel).sendEmbed(
                embed, {
                    disableEveryone: true
                }
            );
        });
    }
    if (msg.content.startsWith(prefix + 'unban')) {
        var user = msg.mentions.users.first()
        var member = msg.guild.member;
        var reason = msg.content.split(' ').slice(2).join(' ');
        if (!msg.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
            return msg.channel.send("`ERROR:` I do not have permission to ban.");
        }
        msg.guild.fetchBans().then(users => {
            if (isNaN(msg.content.split(" ")[1])) {
                user = users.find('username', msg.content.split(" ")[1]);
            } else {
                user = users.get(msg.content.split(" ")[1]);
            }
            msg.guild.unban(user);
            msg.user.sendMessage(`You have been unbanned from ${msg.guild.name}`)
            msg.channel.sendMessage(`${user} has been unbanned from the guild! :ok_hand::skin-tone-4:`)
            var embed = new Discord.RichEmbed();
            embed.addField(`Moderator`, `${msg.author.username}`, true)
                .setColor(0xFFF00)
                .setTimestamp()
                .addField('User Unbanned', `${user}`, true)
             bot.channels.get(config.logchannel).sendEmbed(
                embed, {
                    disableEveryone: true
                }
            );
        });
    }
    
    if (command == "help") {
    if (!msg.channel.permissionsFor(bot.user.id).hasPermission("EMBED_LINKS")) {
      return msg.channel.sendMessage("This command needs EMBED_LINKS permission, please ask a Administrator or the Owner to add that permission to your role.")
    }
        var embed = new Discord.RichEmbed();    
            embed.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
            .setColor(randomcolor())
            .setDescription(`Selfbot Help`)
            .setFooter('Selfbot Made By Sama#0037', ' ')
            .addField('Ping', `Get a timestamp of how long it takes to send a message.`)
            .addField('Purge', `Deletes a certain amount of messages.`)
            .addField('Clear', `Deletes a certain amount of **my** messages`)
            .addField('Eval', `Evaluate JavaScript`)
            .addField('Block', `Blocks the user that was mentioned`)
            .addField('Unblock', `Unblocks the user that was mentioned`)
            .addField('Friend', `Friends the user that was mentioned`)
            .addField('Unfriend', `Unfriends the user that was mentioned`)
            .addField('Ban', `Bans the user that was mentioned`)
            .addField('Softban', `Softbans the user that was mentioned`)
            .addField('Kick', `Kicks the user that was mentioned`)
            .addField('Warn', `Warns the user that was mentioned`)
            .addField('Unban', `Unbans the user that was specified. <By ID or Username>`)
            .addField('Userinfo', `Gets user information about the author. **ME**`)
            .addField('Whois', `Gets information about the user that was mentioned`)
            .addField('Serverinfo', `Gets information about the guild.`)
            .addField('CB', `Puts the message content into a codeblock of JavaScript`)
            .addField('Embed', `Puts your message into embed format`)
            .addField('Stats', `Get information about your selfbot`)
            .addField('Get', `Used to get the user that was mentioned avatar`)
            .addField('Quote', `To reply what someone said.`)
            .addField('Reload', `Used to restart the bot if PM2 a forever JS process is running`)
            .addField('Info', `Credits to the selfbot creator!`)
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
    }
    
        if (msg.content === prefix + "info") {
        var embed = new Discord.RichEmbed();    
            embed.setAuthor(`Sama#0037 (255815122616844288)`, `https://cdn.discordapp.com/avatars/255815122616844288/3695286eb5f03fd1975bdcfbff8d2952.jpg?size=1024`)
            .setColor(0x244bcc)
            .setFooter('Selfbot Made By Sama#0037', ' ')
            .addField('Link', `http://github.com/samakiii/selfbot`, true)
            .addField('Where to find **me**', 'https://discord.gg/SvDzKn7')
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
    }
    
});
bot.login(config.token);
