module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      money: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      yoinks: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      timestamps: false
    });
    return User;
};

  