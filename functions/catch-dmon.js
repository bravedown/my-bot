const db = require('../models');
module.exports = function(userId, dMonId, quantity) {
    db.DMonInv.findAll({
        where: {
            UserId: userId,
            DiscordmonId: dMonId
        }
    }).then(res => {
        if (res.length > 0) {
            db.DMonInv.update({
                quantity: +res[0].dataValues.quantity + quantity
            }, {
                where: {
                    id: res[0].dataValues.id
                }
            });
        } else {
            db.DMonInv.create({
                UserId: userId,
                DiscordmonId: dMonId,
                quantity: quantity
            })
        }
    })
}