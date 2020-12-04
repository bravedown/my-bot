const db = require("../../models");
const getYoinks = require('../../functions/get-yoinks');
module.exports = {
	name: 'yoinks',
    description: 'Check your yoinks.',
    aliases: ['yoink'],
	async execute(message, args) {
        let yoinks = await getYoinks(message.author.id);
        message.reply(yoinks);
	},
};
