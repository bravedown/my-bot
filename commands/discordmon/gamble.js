const db = require("../../models");
const rarities = require('../../config/rarities.json');
const spawn = require('./spawn').execute;
module.exports = {
	name: 'gamble',
    description: 'Gamble away a discordmon, 40% of the time a brand new discordmon will spawn!',
    cooldown: 0,
    args: true,
	execute(message, args) {
        let [rarity, name] = args;
        rarity = rarity.toUpperCase();
        let number = args[2] || 1;
        number = Math.floor(number);
        db.Discordmon.findAll({
            where: {
                name: name,
                rarity: rarity
            }
        }).then(res => {
            let dMonId = res[0].dataValues.id;
            db.DMonInv.findAll({
                where: {
                    UserId: message.author.id,
                    DiscordmonId: dMonId
                }
            }).then(resp => {
                if (resp.length > 0) {
                    let {id, quantity} = resp[0].dataValues;
                    if (quantity - number >= 0) {
                        let randNum = Math.random();
                        if (randNum < 1/3) {
                            let spawnMultiplier = rarities[rarity].value;
                            spawn(message, 'override', spawnMultiplier * number);
                        } else {
                            message.reply("you weren't lucky this time.")
                            db.DMonInv.update({
                                quantity: quantity - number
                            }, {
                                where: {
                                    id: id
                                }
                            })
                        }
                        return;
                    } 
                } 
                message.reply(`you don't have enough ${rarity} ${name}'s.`)
            })
        })
	},
};
