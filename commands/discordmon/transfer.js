const db = require("../../models");
const catchDMon = require('../../functions/catch-dmon');
module.exports = {
	name: 'transfer',
    description: 'Check your dmon inventory. Mention someone to get their inventory instead!',
    args: true,
	execute(message, args) {
        let [rarity, name, quantityToTransfer] = args.slice(1);
        db.Discordmon.findOne({
            where: {
                rarity: rarity,
                name: name
            }
        }).then(res => {
            if (res.length === 0) return;
            let dMonId = res.id;
            db.DMonInv.findOne({
                where: {
                    UserId: message.author.id,
                    DiscordmonId: dMonId
                }
            }).then(resp => {
                if (resp.length === 0) return;
                let ownedQuantity = resp.quantity;
                if (ownedQuantity >= quantityToTransfer) {
                    db.DMonInv.update({quantity: ownedQuantity - quantityToTransfer}, {
                        where: {
                            UserId: message.author.id,
                            DiscordmonId: dMonId
                    }}).then(response => {
                        let mentionId = message.mentions.users.first().id;
                        catchDMon(mentionId, dMonId, +quantityToTransfer);
                        message.reply('transferred');
                    });
                }
            })
        });
	},
};
