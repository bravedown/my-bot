module.exports = function(sequelize, DataTypes) {
    const DMonInv = sequelize.define("DMonInv", {
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false
    });

    DMonInv.associate = models => {
        console.log(models);
        DMonInv.belongsTo(models.Discordmon, {
            foreignKey: {
                allowNull: false
            }
        });
        DMonInv.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return DMonInv;
};

  