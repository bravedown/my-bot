const db = require("../../models");
module.exports = {
	name: 'yoinks',
    description: 'Check your yoinks.',
    aliases: ['yoink'],
	execute(message, args) {
        db.User.findOne({where:{id: message.author.id}})
            .then(res => {
                let { yoinks } = res;
                message.reply(`you have ${yoinks} yoinks!`);
            })
            .catch(err => {
                message.reply('something went wrong.');
            })
	},
};
