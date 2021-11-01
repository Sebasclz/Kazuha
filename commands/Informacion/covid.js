const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const superagent = require('superagent')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('covid')
                .setDescription('Regresa informacion del covid-19 de un pais')
                .addStringOption(option =>
                option.setName('pais')
                .setDescription('Introduce el nombre pais')
                .setRequired(true)),
        async run(client, interaction){
            try{
                const pais = interaction.options.getString('pais')

                const paisString = pais.toString()

                if(paisString === 'España' || 'españa'){
                    superagent
                .get(`https://disease.sh/v3/covid-19/countries/spain`)
                .end((err, res) => {
                  const body = res.body

                    const embedError = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('El nombre del pais es invalido')
                    .setFooter('Los nombres de los paises NO LATINOS se escriben en INGLES', interaction.user.avatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor(config.defaultErrorColor)
    
                    if(body.message) return interaction.reply({ embeds: [embedError]})

                    const embed = new MessageEmbed()
                    .setTitle(`Informacion del covid en ${body.country}`)
                    .setThumbnail(`${body.countryInfo.flag}`)
                    .addField('Casos totales', `${body.cases}`)
                    .addField('Casos totales por cada millon de habitantes', `${body.casesPerOneMillion}`)
                    .addField('Casos hoy', `${body.todayCases}`)
                    .addField('Casos activos por cada millon de habitantes', `${body.activePerOneMillion}`)
                    .addField('Casos criticos', `${body.critical}`)
                    .addField('Casos criticos por cada millon de habitantes', `${body.criticalPerOneMillion}`)
                    .addField('Muertes totales', `${body.deaths}`)
                    .addField('Muertes totales por cada millon de habitantes', `${body.deathsPerOneMillion}`)
                    .addField('Muertes hoy', `${body.todayDeaths}`)
                    .addField('Recuperados', `${body.recovered}`)
                    .addField('Recuperados hoy', `${body.todayRecovered}`)
                    .addField('Casos recuperados por cada millon de habitantes', `${body.recoveredPerOneMillion}`)
                    .addField('Tests hechos', `${body.tests}`)
                    .addField('Tests por cada millon de habitantes', `${body.testsPerOneMillion}`)
                    .setColor(config.defaultSuccessColor)
                    .setFooter(`Covid-19 ${body.country}`, interaction.user.avatarURL({ dynamic: true }))
                    .setTimestamp()
    
                    return interaction.reply({ embeds: [embed]})
                })
                } else {
                superagent
                .get(`https://disease.sh/v3/covid-19/countries/${pais}`)
                .end((err, res) => {
                  const body = res.body

                    const embedError = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('El nombre del pais es invalido')
                    .setFooter('Los nombres de los paises NO LATINOS se escriben en INGLES', interaction.user.avatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor(config.defaultErrorColor)
    
                    if(body.message) return interaction.reply({ embeds: [embedError]})

                    const embed = new MessageEmbed()
                    .setTitle(`Informacion del covid en ${body.country}`)
                    .setThumbnail(`${body.countryInfo.flag}`)
                    .addField('Casos totales', `${body.cases}`)
                    .addField('Casos totales por cada millon de habitantes', `${body.casesPerOneMillion}`)
                    .addField('Casos hoy', `${body.todayCases}`)
                    .addField('Casos activos por cada millon de habitantes', `${body.activePerOneMillion}`)
                    .addField('Casos criticos', `${body.critical}`)
                    .addField('Casos criticos por cada millon de habitantes', `${body.criticalPerOneMillion}`)
                    .addField('Muertes totales', `${body.deaths}`)
                    .addField('Muertes totales por cada millon de habitantes', `${body.deathsPerOneMillion}`)
                    .addField('Muertes hoy', `${body.todayDeaths}`)
                    .addField('Recuperados', `${body.recovered}`)
                    .addField('Recuperados hoy', `${body.todayRecovered}`)
                    .addField('Casos recuperados por cada millon de habitantes', `${body.recoveredPerOneMillion}`)
                    .addField('Tests hechos', `${body.tests}`)
                    .addField('Tests por cada millon de habitantes', `${body.testsPerOneMillion}`)
                    .setColor(config.defaultSuccessColor)
                    .setFooter(`Covid-19 ${body.country}`, interaction.user.avatarURL({ dynamic: true }))
                    .setTimestamp()
    
                    return interaction.reply({ embeds: [embed]})
                })
            }
            } catch (e){ //Si da error le avisamos al usuario y lo reportamos al servidor
                console.error(e)
                interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Ha ocurrido un error fatal. Esto ha sido comunicado a los desarrolladores. No sigas utilizando este comando por favor.')
                    .setTimestamp()
                    .setFooter(interaction.user.username, interaction.user.avatarURL())
                ]})
            };
        }
    }
 