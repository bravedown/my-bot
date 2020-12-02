const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config/bot-config.json');
const db = require('./models');

const intents = new Discord.Intents([Discord.Intents.NON_PRIVILEGED, 'GUILD_MEMBERS']);
const client = new Discord.Client({ws: {intents}});
client.commands = new Discord.Collection();


function getFiles (dir, files_){
    files_ = files_ || [];
    let files = fs.readdirSync(dir);
    for (let i in files){
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}
const commandFiles = getFiles('./commands');

for (const file of commandFiles) {
	const command = require(file);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
	console.log(client.guilds.cache.get('640011810363408424').members.fetch().then(res => console.log('done')));
});

client.on('message', message => {	
	if (!message.content.startsWith(prefix) || message.author.bot) {
		let dmonRoll = Math.floor(Math.random() * 10);
		if (dmonRoll === 0 && !message.author.bot && message.channel.type !== 'dm') 
			client.commands.get('spawn').execute(message, 'override');
		return;
	}
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 0) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

db.sequelize.sync({ force: false }).then(() => {
	console.log("Synced/connected database and models");
	client.login(token).catch(err => console.log(err));
});

