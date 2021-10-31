const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const developer = require('../../models/developer.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Comando solo para desarrolladores')
            .addStringOption(option => 
                option.setName('code')
                .setDescription("Ingresa el codigo a evaluar.")
                .setRequired(true)),
                async run(client, interaction){
                    await interaction.deferReply()
                    const developers = await developer.findOne({ developerId: interaction.user.id })

                    const embedErrorOwner = new MessageEmbed() //Diremos que retorne un embed de error cuando el autor no sea el creador del bot
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Comando solo para desarrolladores')

                    if(developers === null) return interaction.editReply({ embeds: [embedErrorOwner]}) 

                    try{
                        const limit = 4096;
                        let code = interaction.options.getString('code')
                        let evalued = eval(code)
                        if(typeof evalued !== 'string')
                            evalued = require('util').inspect(evalued);
                            let txt = "" + evalued;
                            
                            if(txt.length > limit){

                            const embed = new MessageEmbed()
                            .setTitle('Eval | Kazuha')
                            .setDescription('📥 Entrada\n```js\n' + code + '```\n📤 Salida\n```js\n' + txt.slice(0, limit) + '```')
                            .setColor(config.defaultSuccessColor)

                            return interaction.editReply({ embeds: [embed]})
                        } else {
                            
                            const embed = new MessageEmbed()
                            .setTitle('Eval | Kazuha')
                            .setDescription('📥 Entrada\n```js\n' + code + '```\n📤 Salida\n```js\n' + txt + '```')
                            .setColor(config.defaultSuccessColor)

                            return interaction.editReply({ embeds: [embed]})
                        }

                    } catch(e) {
                        return interaction.editReply({ content: "`Ha surgido un problema`", embeds: [
                            new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setDescription('```js\n' + e + '```')
                        ]})
                    }
                }
            }