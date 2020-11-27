const db = require("../../models");
module.exports = {
	name: 'add-dmon',
    description: 'Add dmon to db.',
    args: true,
	execute(message, args) {
		db.Discordmon.create({
            name: args[0],
            rarity: args[1]
        });
        message.reply("YEP COCK");
	},
};
