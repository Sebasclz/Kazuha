const { MessageEmbed } = require ('discord.js')
const config = require('../config.json')
const { DiscordTogether } = require('discord-together');

module.exports = {
    data: {
        name: 'sesiones'
    },
    async run(client, interaction) {
        if(!interaction.isSelectMenu()) return;
        client.discordTogether = new DiscordTogether(client);

        const embedNoChannel = new MessageEmbed()
        .setColor(config.defaultErrorColor)
        .setTitle('Error')
        .setDescription('Necesitas estar en un canal de voz para ejecutar este comando')
        
        if (!interaction.member.voice.channel) return interaction.update({ content: ' ', ephemeral: true, embeds: [embedNoChannel], components: []})
        switch (interaction.values[0]) {
            case 'youtube':
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`**[Haz click aqui](${invite.code})**`);
                    
                    return interaction.update({ content: ' ', embeds: [embed], components: []});
                });
                break
                case 'fishington':
                    client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'fishing').then(async invite => {
                        const embed = new MessageEmbed()
                        .setColor(config.defaultSuccessColor)
                        .setDescription(`**[Haz click aqui](${invite.code})**`);
                        
                        return interaction.update({ content: ' ', embeds: [embed], components: []});
                    });
                break
            case 'betrayal':
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'betrayal').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`**[Haz click aqui](${invite.code})**`);
                    
                    return interaction.update({ content: ' ', embeds: [embed], components: []});
                });
                break
            case 'poker':
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'poker').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`**[Haz click aqui](${invite.code})**`);
                    
                    return interaction.update({ content: ' ', embeds: [embed], components: []});
                });
                break
            case 'chess':
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'chess').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`**[Haz click aqui](${invite.code})**`);
                    
                    return interaction.update({ content: ' ', embeds: [embed], components: []});
                });
                break
            case 'letterTile':
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'lettertile').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`**[Haz click aqui](${invite.code})**`);
                    
                    return interaction.update({ content: ' ', embeds: [embed], components: []});
                });
                break
            case 'wordsSnack':
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'wordsnack').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`**[Haz click aqui](${invite.code})**`);
                    
                    return interaction.update({ content: ' ', embeds: [embed], components: []});
                });
                break
            case 'doodleCrew':
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'doodlecrew').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`**[Haz click aqui](${invite.code})**`);
                    
                    return interaction.update({ content: ' ', embeds: [embed], components: []});
                });
                break
            case 'spellCast':
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'spellcast').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`**[Haz click aqui](${invite.code})**`);
                    
                    return interaction.update({ content: ' ', embeds: [embed], components: []});
                });
                break
            case 'awkword':
                client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'awkword').then(async invite => {
                    const embed = new MessageEmbed()
                    .setColor(config.defaultSuccessColor)
                    .setDescription(`**[Haz click aqui](${invite.code})**`);
                    
                    return interaction.update({ content: ' ', embeds: [embed], components: []});
                });
                break
                case 'orcheckerinthepark':
                    client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'checkers').then(async invite => {
                        const embed = new MessageEmbed()
                        .setColor(config.defaultSuccessColor)
                        .setDescription(`**[Haz click aqui](${invite.code})**`);
                        
                        return interaction.update({ content: ' ', embeds: [embed], components: []});
                    });
                    break
            }
        }
    }