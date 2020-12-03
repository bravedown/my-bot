const db = require('../models');
function getYoinks(id) {
    return new Promise((resolve, reject) => {
        db.User.findOne({where: {id: id}})
            .then(user => resolve(user.yoinks))
            .catch(err => reject(err));
    });
}
module.exports = getYoinks;