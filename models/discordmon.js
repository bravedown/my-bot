module.exports = function(sequelize, DataTypes) {
    const DiscordMon = sequelize.define("Discordmon", {
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
    return DiscordMon;
};

  