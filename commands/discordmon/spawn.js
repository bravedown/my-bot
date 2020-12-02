const Sequelize = require("sequelize");
const db = require("../../models");
// const rarities = require('../../config/rarities.json');
module.exports = {
	name: 'spawn',
    description: 'Spawn a random dmon!',
	execute(message, args, mult = 1) {
        if (message.guild.members.cache.get(message.author.id).hasPermission('ADMINISTRATOR') || args === 'override') {
            db.Discordmon.findAll().then(res => {
                const rarities = {
                    common: {
                        values: res.filter(el => el.dataValues.rarity === 'COMMON'),
                        weight: 300
                    }, 
                    uncommon: {
                        values: res.filter(el => el.dataValues.rarity === 'UNCOMMON'),
                        weight: 200
                    }, 
                    rare: {
                        values: res.filter(el => el.dataValues.rarity === 'RARE'),
                        weight: 100
                    }, 
                    epic: {
                        values: res.filter(el => el.dataValues.rarity === 'EPIC'),
                        weight: 60
                    }, 
                    legendary: {
                        values: res.filter(el => el.dataValues.rarity === 'LEGENDARY'),
                        weight: 30
                    }, 
                    mythic: {
                        values: res.filter(el => el.dataValues.rarity === 'MYTHIC'),
                        weight: 10
                    },
                    ultramythic: {
                        values: res.filter(el => el.dataValues.rarity === 'ULTRAMYTHIC'),
                        weight: 1
                    }
                };
                let cats = [];
                let pos = 0;
                for (let prop in rarities) {
                    if (rarities[prop].values.length > 0) {
                        pos += rarities[prop].weight;
                        cats.push([prop, pos]);
                    }
                }
                let randNum = Math.floor(Math.random() * pos);
                let chosenRarity = "";
                for (let cat of cats) {
                    if (randNum < cat[1]) {
                        chosenRarity = cat[0];
                        break;
                    }
                }
                let chosenDMon = rarities[chosenRarity].values[Math.floor(Math.random() * rarities[chosenRarity].values.length)].dataValues;
                let amount = mult > 1 ? mult
                    :/[aeiou]/i.test(chosenDMon.rarity[0]) ? 'an'
                    :'a';
                let messageStr = `${amount} ${chosenDMon.rarity} ${chosenDMon.name}${mult > 1 ? "'s have" : ' has'} appeared! React with 🤗 to be their friend! Be quick, before someone else reacts first!`;
                const files = chosenDMon.imgLink ? {files: [chosenDMon.imgLink]} : {};
                message.reply(messageStr, files).then(reply => {
                    reply.react('🤗');
                    let reactUser;
                    const filter = (reaction, user) => {
                        reactUser = user;
                        return ['🤗'].includes(reaction.emoji.name) && !user.bot;
                    };
                    
                    reply.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                        .then(collected => {
                            db.User.create({id: reactUser.id}).then(res => {
                                console.log('New user added to db.');
                                require('../../functions/catch-dmon')(reactUser.id, chosenDMon.id, mult);
                            }).catch(err => {
                                console.log('User already exists in db.');
                                require('../../functions/catch-dmon')(reactUser.id, chosenDMon.id, mult);
                            })
                            let isYoink = reactUser.id !== message.author.id;
                            if (isYoink) db.User.update({yoinks: Sequelize.literal('yoinks + 1')}, {where: {id: reactUser.id}})
                            reply.edit(`<@${reactUser.id}>, you are now friends with ${mult > 1 ? mult + ' ' : ''}${chosenDMon.rarity} ${chosenDMon.name}! ${isYoink ? 'YOINK!' : ''}`, files);
                        })
                        .catch(collected => {
                            console.log(`Nobody reacted :(`);
                            reply.edit(`Nobody wanted to be friends with ${mult > 1 ? mult + ' ' : ''}${chosenDMon.rarity} ${chosenDMon.name} 😢`, files);
                        });
                });
            });
        } else {
            message.reply("You don't have permission to use this command.");
        }
	},
};
