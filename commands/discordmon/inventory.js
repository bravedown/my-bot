const db = require("../../models");
const MessageEmbed = require('discord.js').MessageEmbed;
const getInventoryValue = require('../../functions/inv-value');
const getYoinks = require('../../functions/get-yoinks');
const rarities = require('../../config/rarities.json');
const Pagination = require("../../functions/pagination");

module.exports = {
	name: 'inventory',
    description: 'Check your dmon inventory. Mention someone to get their inventory instead! Add `persist` to the command if you don\'t want the inventory to auto-delete.',
    aliases: ['inv'],
    execute(message, args) {
        message.delete();
        let userId = message.mentions.users.size ? message.mentions.users.first().id
            :message.author.id;
        db.DMonInv.findAll({
            where: {UserId: userId},
            include: [db.Discordmon]
        }).then(res => {
            let {username} = message.guild.members.cache.get(userId).user;
            let embeds = [];
            var embed = new MessageEmbed();
            let counter = 0;
            for (let prop in rarities) {
                let rows = res.filter(e => e.Discordmon.rarity == prop);
                rows.forEach(e => {
                    let {name, rarity, imgLink} = e.Discordmon;
                    let quantity = e.quantity;
                    if (quantity > 0) {
                        if (counter > 23) {
                            embeds.push(embed);
                            embed = new MessageEmbed();
                            counter = 0;
                        }
                        embed.addField(`${name} x${quantity}`, `[${rarity}](${imgLink})`, true).setImage(imgLink);
                        counter++;
                    }
                });
            }
            embeds.push(embed);
            getInventoryValue(userId).then(value => {
            getYoinks(userId).then(yoinks => {
                let title = `${username}'s Inventory`;
                let footer = `Value: ${value}         Yoinks: ${yoinks}`;
                new Pagination(message, embeds, title, footer).send();
            })});
        });
	},
};

