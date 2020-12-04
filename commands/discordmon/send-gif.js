module.exports = {
	name: 'send-gif',
    description: 'Request a new d-mon to be approved by an admin!\nSyntax: `-request-dmon <name> <rarity: common, uncommon, rare, epic, legendary, mythic> <imgLink (optional)>`',
	execute(message, args) {
		if (message.guild.members.cache.get(message.author.id).hasPermission('ADMINISTRATOR') || args === 'override') 
            message.channel.send({files: ['https://cdn.discordapp.com/attachments/640350449932697610/784171717421301780/wonyFlower.gif']});
	},
};

