const db = require("../../models");
module.exports = {
	name: 'add-user',
	description: 'Add user to db.',
	execute(message, args) {
		db.User.create({
            uid: message.author.id,
            money: 500
        });
	},
};
