const db = require("../../models");
module.exports = {
	name: 'catch-dmon',
	description: 'Add user to db.',
	execute(message, args) {
		db.DMonInv.create({
            UserId: message.author.id,
            DiscordmonId: args[0],
        });
	},
};
