module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      id: {
          type: DataTypes.INTEGER,
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

  