const db = require("../../models");
module.exports = {
	name: 'catch-dmon',
	description: 'Add user to db.',
	execute(message, args) {
		if (message.guild.members.cache.get(message.author.id).hasPermission('ADMINISTRATOR')) 
			return message.reply('You do not have permission!');
		db.DMonInv.create({
            UserId: message.author.id,
            DiscordmonId: args[0]
        });
	},
};
