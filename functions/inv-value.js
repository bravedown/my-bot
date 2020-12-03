const db = require('../models');
const rarities = require('../config/rarities.json');
function getInventoryValue(id) {
    return new Promise((resolve, reject) => {
        db.DMonInv.findAll({
            where: {UserId: id},
            include: [db.Discordmon]
        })
            .then(res => {
                let valueSum = 0;
                res.forEach(e => {
                    console.log(e);
                    valueSum += rarities[e.Discordmon.rarity].value * e.quantity;
                });
                resolve(valueSum);
            }).catch(err => reject(err));
    });
}
module.exports = getInventoryValue;