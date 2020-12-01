const db = require("../../models");
module.exports = {
	name: 'add-dmon',
    description: 'Add dmon to db.',
    args: true,
	execute(message, args) {
        if (message.guild.members.cache.get(message.author.id).hasPermission('ADMINISTRATOR')) 
            return message.reply('You do not have permission!');
        if (typeof args[1] === 'string') args[1] = args[1].toUpperCase();
        console.log(args[1]);
        switch(args[1]) {
            case 'COMMON':
            case 'UNCOMMON':
            case 'RARE':
            case 'EPIC':
            case 'LEGENDARY':
            case 'MYTHIC':
                if (typeof args[2] === 'string') {
                    if (args[2].substring(0, 5) === 'https') {
                        db.Discordmon.create({
                            name: args[0],
                            rarity: args[1],
                            imgLink: args[2]
                        })
                    } else {
                        db.Discordmon.create({
                            name: args[0],
                            rarity: args[1],
                        });
                    }
                } else {
                    db.Discordmon.create({
                        name: args[0],
                        rarity: args[1],
                    });
                }
                break;
            default: 
                message.reply("Please use the proper syntax and pick a valid rarity!\nProper syntax: `!add-dmon <name> <rarity> <link-to-img>`\nValid rarities: `common, uncommon, rare, epic, legendary, mythic`")
        }
		
        message.reply("YEP COCK");
	},
};
