module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      uid: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false
      },
      money: DataTypes.INTEGER
    },
    {
      timestamps: false
    });
    return User;
};

  