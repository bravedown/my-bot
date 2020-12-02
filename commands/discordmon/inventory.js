const db = require("../../models");
const Discord = require('discord.js');
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
            let embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${username}'s Inventory`);
            res.forEach(e => {
                let {name, rarity, imgLink} = e.dataValues.Discordmon;
                let quantity = e.dataValues.quantity;
                if (quantity > 0)
                    embed.addField(`${name} x${quantity}`, `[${rarity}](${imgLink})`, true).setImage(imgLink);
            })
            message.channel.send(embed).then(reply => {
                if (!persistMessage) reply.delete({timeout: 60000});
            });
        });
	},
};