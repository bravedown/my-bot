module.exports = function(sequelize, DataTypes) {
    const DMonInv = sequelize.define("DMonInv", {
      quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 1
      }
    },
    {
      timestamps: false
    });

    DMonInv.associate = models => {
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

  