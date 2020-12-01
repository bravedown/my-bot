// const db = require("../../models");
// module.exports = {
// 	name: 'inventory',
//     description: 'Check your dmon inventory. Mention someone to get their inventory instead!',
// 	execute(message, args) {
//         let userId = message.mentions.users.size ? 
//             message.mentions.users.first().id
//             :message.author.id;
//         db.DMonInv.findAll({
//             where: {UserId: userId},
//             include: [db.Discordmon]
//         }).then(res => {
//             let msgStr = `<@${userId}>'s inventory:`;
//             res.forEach(e => {
//                 let {name, rarity, imgLink} = e.dataValues.Discordmon;
//                 let quantity = e.dataValues.quantity;
//                 if (quantity > 0)
//                     msgStr += `\n\`${rarity} ${name}\` x${quantity}${imgLink ? ', ' + imgLink : ''}`
//             })
//             message.channel.send(msgStr);
//         });
// 	},
// };
