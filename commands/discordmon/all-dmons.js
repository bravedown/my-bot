const db = require("../../models");
const MessageEmbed = require('discord.js').MessageEmbed;
const rarities = require('../../config/rarities.json');
module.exports = {
	name: 'all-dmons',
    description: 'List all dmons',
    aliases: ['all-dmon', 'discordmons', 'discordmon', 'hootermons', 'hootermon'],
	execute(message, args) {
        db.Discordmon.findAll().then(res => {
            const embed = new MessageEmbed()
                .setTitle('Discordmons');
            for (let prop in rarities) {
                const rows = res.filter(e => e.rarity == prop);
                let namesStr = '';
                let counter = 1;
                let newLine = false;
                rows.forEach(e => {
                    if (newLine) namesStr += ', ';
                    namesStr += `${counter}. [${e.name}](${e.imgLink})`;
                    if (newLine) namesStr += '\n';
                    counter++;
                    newLine = !newLine;
                });
                if (rows.length > 0)
                    embed.addField(prop, namesStr, false);
            }
            message.channel.send(embed);
        }).catch(err => {
            console.log(err);
            message.reply('there was an error.')
        });
	},
};
