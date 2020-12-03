const db = require("../../models");
module.exports = {
	name: 'clear-inv',
	description: 'Release all your dmon!',
	execute(message, args) {
        db.DMonInv.update({quantity: 0}, {where: {UserId: message.author.id}})
            .then(res => {
                message.reply(`inventory cleared.`);
            });
	},
};
