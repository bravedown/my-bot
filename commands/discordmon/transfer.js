const db = require("../../models");
module.exports = {
	name: 'transfer',
    description: 'Check your dmon inventory. Mention someone to get their inventory instead!',
    args: true,
	execute(message, args) {
        let [rarity, name, quantityToTransfer] = args.slice(1);
        db.Discordmon.findAll({
            where: {
                rarity: rarity,
                name: name
            }
        }).then(res => {
            if (res.length === 0) return;
            let dMonId = res[0].dataValues.id;
            db.DMonInv.findAll({
                where: {
                    UserId: message.author.id,
                    DiscordmonId: dMonId
                }
            }).then(resp => {
                if (resp.length === 0) return;
                let ownedQuantity = resp[0].dataValues.quantity;
                if (ownedQuantity >= quantityToTransfer) {
                    db.DMonInv.update({quantity: ownedQuantity - quantityToTransfer}, {
                        where: {
                            UserId: message.author.id,
                            DiscordmonId: dMonId
                    }}).then(response => {
                        let mentionId = message.mentions.users.first().id;
                        require('../../functions/catch-dmon')(mentionId, dMonId, +quantityToTransfer);
                        message.reply('transferred');
                    })
                }
            })
        })
        let userId = message.mentions.users.first().id;
        db.DMonInv.findAll({
            where: {
                UserId: message.author.id,
            },
            include: [db.Discordmon]
        }).then(res => {
            if (res.length === 0) return;
            res.dataValues.quantity
        });
	},
};
