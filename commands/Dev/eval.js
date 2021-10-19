const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Evalua el codigo que quieras')
            .addStringOption(option => 
                option.setName('code')
                .setDescription("Ingresa el codigo a evaluar.")
                .setRequired(true)),
                async run(client, interaction){
                    const embedError = new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Comando solo para desarrolladores')
                    if(interaction.user.id !== '419574607020949505') return interaction.reply({ embeds: [embedError]})

                    try{
                        const limit = 1950;
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

                            return interaction.reply({ embeds: [embed]})
                        } else {
                            
                            const embed = new MessageEmbed()
                            .setTitle('Eval | Kazuha')
                            .setDescription('📥 Entrada\n```js\n' + code + '```\n📤 Salida\n```js\n' + txt + '```')
                            .setColor(config.defaultSuccessColor)

                            return interaction.reply({ embeds: [embed]})
                        }

                    } catch(e){
                        console.log(e)
                        return interaction.reply({ content: "`Ha surgido un problema`", embeds: [
                            new MessageEmbed()
                            .setColor(config.defaultErrorColor)
                            .setDescription(`\`${e}\``)
                        ]})
                    }
                }
            }