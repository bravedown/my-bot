const db = require("../../models");
module.exports = {
	name: 'gamble',
    description: 'Gamble away a discordmon, 40% of the time a brand new discordmon will spawn!',
	execute(message, args) {
        let [rarity, name] = args;
        let number = args[2] || 1;
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
                console.log(resp);
                if (resp.length > 0) {
                    let {id, quantity} = resp[0].dataValues;
                    if (quantity > -1 + number) {
                        return db.DMonInv.update({
                            quantity: quantity - number
                        }, {
                            where: {
                                id: id
                            }
                        }).then(response => {
                            let randNum = Math.random();
                            if (randNum < 1/3) {
                                let spawnMultiplier;
                                switch (rarity) {
                                    case 'COMMON': 
                                        spawnMultiplier = 1;
                                        break;
                                    case 'UNCOMMON': 
                                        spawnMultiplier = 2;
                                        break;
                                    case 'RARE': 
                                        spawnMultiplier = 3;
                                        break;
                                    case 'EPIC': 
                                        spawnMultiplier = 4;
                                        break;
                                    case 'LEGENDARY': 
                                        spawnMultiplier = 5;
                                        break;
                                    case 'MYTHIC': 
                                        spawnMultiplier = 6;
                                        break;
                                }
                                require('./spawn').execute(message, 'override', spawnMultiplier * number);
                            } else {
                                message.reply("you weren't lucky this time.")
                            }
                        })
                    } 
                } 
                message.reply(`you don't have any ${rarity} ${name}'s.`)
            })
        })
        
	},
};
