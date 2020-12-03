const db = require("../../models");
const getYoinks = require('../../functions/get-yoinks');
module.exports = {
	name: 'yoinks',
    description: 'Check your yoinks.',
    aliases: ['yoink'],
	execute(message, args) {
        getYoinks(message.author.id)
            .then(yoinks => message.reply(yoinks))
            .catch(err => {
                console.log(err);
                message.reply('there was an error.');
            });
	},
};
