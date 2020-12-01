const db = require("../../models");
module.exports = {
	name: 'request-dmon',
	description: 'Request a new d-mon to be approved by an admin!\nSyntax: `!request-dmon <name> <rarity: common, uncommon, rare, epic, legendary, mythic> <imgLink (optional)>`',
	execute(message, args) {
		db.DMonRequest.create({
            name: args[0],
            rarity: args[1],
            imgLink: args[2],
            UserId: message.author.id
        }).then(res => {
            message.reply('request made successfully!');
        }).catch(err => {
            console.log(err);
            message.reply('request was unsuccessful.');
        })
	},
};
