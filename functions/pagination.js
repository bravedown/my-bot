let emojis = ['⬅️','➡️','❌'];
class Pagination {
    constructor(message, embeds, title = false, footer = false, authorOnly = true) {
        for (let i = 0; i < embeds.length; i++) {
            if (title) embeds[i].setTitle(title);
            if (footer) embeds[i].setFooter(footer);
            embeds[i].setDescription(`Page ${i + 1} of ${embeds.length}`);
        }
        
        this.channel = message.channel;
        this.authorId = message.author.id;
        this.embeds = embeds;
        this.pageIdx = 0;
        this.authorOnly = authorOnly;
    }
    async send() {
        let msg = await this.channel.send(this.embeds[0]);   
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
    }
}
module.exports = Pagination;