const db = require("../../models");
module.exports = {
	name: 'clear-inv',
	description: 'Release all your dmon!',
	execute(message, args) {
		db.DMonInv.destroy({
            where: {
                UserId: message.author.id
            }
        }).then(rows => {
            message.reply(`deleted ${rows} rows`);
        });
	},
};
