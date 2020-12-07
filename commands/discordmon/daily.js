const getInventoryValue = require('../../functions/inv-value');
const spawn = require('./spawn').execute;

module.exports = {
	name: 'daily',
    description: 'Spawn 5% of your inventory\'s value, or 5, whichever is larger.',
    cooldown: 86400,
	async execute(message, args) {
        let value = await getInventoryValue(message.author.id);
        let numberToSpawn = Math.floor(value / 20);
        if (numberToSpawn < 5) numberToSpawn = 5;
        spawn(message, 'override', numberToSpawn);
	},
};
