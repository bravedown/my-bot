let emojis = ['⬅️','➡️','❌'];
class Pagination {
    constructor(message, embeds, title = false, footer = false, authorOnly = true) {
        if (title) embeds.forEach(e => e.setTitle(title));
        if (footer) embeds.forEach(e => e.setFooter(footer));
        
        this.channel = message.channel;
        this.authorId = message.author.id;
        this.embeds = embeds;
        this.pageIdx = 0;
        this.authorOnly = authorOnly;
    }
    send() {
        this.channel.send(this.embeds[0])
            .then(msg => {
                let reactUser;
                const filter = (reaction, user) => {
                    reactUser = user;
                    let hasValidEmoji = emojis.includes(reaction.emoji.name);
                    let isValidAuthor = this.authorOnly ? user.id == this.authorId : true;
                    return hasValidEmoji && isValidAuthor && !user.bot;
                };
                emojis.forEach(e => msg.react(e));
                const collector = msg.createReactionCollector(filter, {time: 300000});
                collector.on('collect', r => {
                    r.users.remove(reactUser.id);
                    switch(r.emoji.name) {
                        case emojis[0]:
                            if (this.pageIdx > 0) {
                                this.pageIdx--;
                                msg.edit(this.embeds[this.pageIdx]);
                            }
                            break;
                        case emojis[1]:
                            if (this.pageIdx < this.embeds.length - 1) {
                                this.pageIdx++;
                                msg.edit(this.embeds[this.pageIdx]);
                            }
                            break;
                        case emojis[2]:
                            msg.delete();
                            break;
                    }
                });
            });
    }
}
module.exports = Pagination;