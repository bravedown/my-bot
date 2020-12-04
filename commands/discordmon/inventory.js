const db = require("../../models");
const MessageEmbed = require('discord.js').MessageEmbed;
const Pagination = require('discord-paginationembed');
const getInventoryValue = require('../../functions/inv-value');
const getYoinks = require('../../functions/get-yoinks');
const rarities = require('../../config/rarities.json');

module.exports = {
	name: 'inventory',
    description: 'Check your dmon inventory. Mention someone to get their inventory instead! Add `persist` to the command if you don\'t want the inventory to auto-delete.',
    aliases: ['inv'],
    execute(message, args) {
        let persistMessage = args.includes('persist') || args.includes('p');
        if (!persistMessage) message.delete();
        let userId = message.mentions.users.size ? message.mentions.users.first().id
            :message.author.id;
        db.DMonInv.findAll({
            where: {UserId: userId},
            include: [db.Discordmon]
        }).then(res => {
            let {username} = message.guild.members.cache.get(userId).user;
            // const Embeds = new PaginationEmbed.Embeds()
            //     .setArray(embeds)
            //     .setAuthorizedUsers([message.author.id])
            //     .setChannel(message.channel)
            //     .setPageIndicator(true)
            //     .setTitle(`${username}'s Inventory`)
            //     .setFooter('Test Footer Text')
            //     .setColor(0x0099FF)
            //     // Sets the client's assets to utilise. Available options:
            //     //  - message: the client's Message object (edits the message instead of sending new one for this instance)
            //     //  - prompt: custom content for the message sent when prompted to jump to a page
            //     //      {{user}} is the placeholder for the user mention
            //     .setClientAssets({ message, prompt: 'Page plz {{user}}' })
            //     .setDeleteOnTimeout(true)
            //     .setDisabledNavigationEmojis(['delete'])
            //     .setFunctionEmojis({
            //         '⬆': (_, instance) => {
            //         for (const embed of instance.array)
            //             embed.fields[0].value++;
            //         },
            //         '⬇': (_, instance) => {
            //         for (const embed of instance.array)
            //             embed.fields[0].value--;
            //         }
            //     })
            //     // Listeners for PaginationEmbed's events
            //     // After the initial embed has been sent
            //     // (technically, after the client finished reacting with enabled navigation and function emojis).
            //     .on('start', () => console.log('Started!'))
            //     // When the instance is finished by a user reacting with `delete` navigation emoji
            //     // or a function emoji that throws non-Error type.
            //     .on('finish', (user) => console.log(`Finished! User: ${user.username}`))
            //     // Upon a user reacting on the instance.
            //     .on('react', (user, emoji) => console.log(`Reacted! User: ${user.username} | Emoji: ${emoji.name} (${emoji.id})`))
            //     // When the awaiting timeout is reached.
            //     .on('expire', () => console.warn('Expired!'))
            //     // Upon an occurance of error (e.g: Discord API Error).
            //     .on('error', console.error);
            let embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${username}'s Inventory`);
            for (let prop in rarities) {
                let rows = res.filter(e => e.Discordmon.rarity == prop);
                rows.forEach(e => {
                    let {name, rarity, imgLink} = e.Discordmon;
                    let quantity = e.quantity;
                    if (quantity > 0)
                        embed.addField(`${name} x${quantity}`, `[${rarity}](${imgLink})`, true).setImage(imgLink);
                });
            }
            getInventoryValue(userId).then(value => {
            getYoinks(userId).then(yoinks => {
                embed.setFooter(`Value: ${value}         Yoinks: ${yoinks}`)
                message.channel.send(embed).then(reply => {
                    if (!persistMessage) reply.delete({timeout: 60000});
                });
            })});
        });
	},
};

