const db = require("../../models");
const rarities = require('../../config/rarities.json');
module.exports = {
	name: 'add-dmon',
    description: 'Add dmon to db.',
    args: true,
	execute(message, args) {
        if (!message.guild.members.cache.get(message.author.id).hasPermission('ADMINISTRATOR')) 
            return message.reply('You do not have permission!');
        let [name, rarity, imgLink] = args;
        if (rarity) rarity = rarity.toUpperCase();
        if (rarity in rarities) {
            db.Discordmon.create({
                name: name,
                rarity: rarity,
                imgLink: imgLink
            });
            message.reply('added!');
        } else message.reply("Please use the proper syntax and pick a valid rarity!\nProper syntax: `!add-dmon <name> <rarity> <link-to-img>`\nValid rarities: `common, uncommon, rare, epic, legendary, mythic`");	
	},
};
