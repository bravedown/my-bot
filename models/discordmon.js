module.exports = function(sequelize, DataTypes) {
    const DiscordMon = sequelize.define("Discordmon", {
      name: DataTypes.STRING,
      rarity: {
        allowNull: false,
        type: DataTypes.STRING
      },
    },
    {
      timestamps: false
    });
    return DiscordMon;
};

  