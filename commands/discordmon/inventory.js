const db = require("../../models");
const MessageEmbed = require('discord.js').MessageEmbed;
const getInventoryValue = require('../../functions/inv-value');
const getYoinks = require('../../functions/get-yoinks');
module.exports = {
	name: 'inventory',
    description: 'Check your dmon inventory. Mention someone to get their inventory instead! Add `persist` to the command if you don\'t want the inventory to auto-delete.',
	execute(message, args) {
        let persistMessage = args.includes('persist');
        if (!persistMessage) message.delete();
        let userId = message.mentions.users.size ? 
            message.mentions.users.first().id
            :message.author.id;
        db.DMonInv.findAll({
            where: {UserId: userId},
            include: [db.Discordmon]
        }).then(res => {
            let {username} = message.guild.members.cache.get(userId).user;
            let embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${username}'s Inventory`);
            res.forEach(e => {
                let {name, rarity, imgLink} = e.Discordmon;
                let quantity = e.quantity;
                if (quantity > 0)
                    embed.addField(`${name} x${quantity}`, `[${rarity}](${imgLink})`, true).setImage(imgLink);
            });
            getInventoryValue(userId).then(value => {
            getYoinks(userId).then(yoinks => {
                embed.setFooter(`Value: ${value}         Yoinks: ${yoinks}`)
                message.channel.send(embed).then(reply => {
                    if (!persistMessage) reply.delete({timeout: 60000});
                });
            })});
        });
	},
};