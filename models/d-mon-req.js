module.exports = function(sequelize, DataTypes) {
    const DMonRequest = sequelize.define("DMonRequest", {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      rarity: {
        allowNull: false,
        type: DataTypes.STRING
      },
      imgLink: DataTypes.STRING
    },
    {
      timestamps: false
    });
    DMonRequest.associate = models => {
        DMonRequest.belongsTo(models.User, {})
    };
    return DMonRequest;
};

  