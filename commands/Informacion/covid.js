const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const fetch = require('node-fetch')

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

                const res = await fetch(`https://corona.lmao.ninja/v2/countries/${pais}`)
                const json = await res.json()

                const embedError = new MessageEmbed()
                .setTitle('Error')
                .setDescription('El nombre del pais es invalido')
                .setFooter('Los nombres de los paises NO LATINOS se escriben en INGLES', interaction.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(config.defaultErrorColor)

                if(json.message) return interaction.reply({ embeds: [embedError]})

                const embed = new MessageEmbed()
                .setTitle(`Informacion del covid en ${json.country}`)
                .setThumbnail(`${json.countryInfo.flag}`)
                .addField('Casos totales', `${json.cases}`)
                .addField('Casos totales por cada millon de habitantes', `${json.casesPerOneMillion}`)
                .addField('Casos hoy', `${json.todayCases}`)
                .addField('Casos activos por cada millon de habitantes', `${json.activePerOneMillion}`)
                .addField('Casos criticos', `${json.critical}`)
                .addField('Casos criticos por cada millon de habitantes', `${json.criticalPerOneMillion}`)
                .addField('Muertes totales', `${json.deaths}`)
                .addField('Muertes totales por cada millon de habitantes', `${json.deathsPerOneMillion}`)
                .addField('Muertes hoy', `${json.todayDeaths}`)
                .addField('Recuperados', `${json.recovered}`)
                .addField('Recuperados hoy', `${json.todayRecovered}`)
                .addField('Casos recuperados por cada millon de habitantes', `${json.recoveredPerOneMillion}`)
                .addField('Tests hechos', `${json.tests}`)
                .addField('Tests por cada millon de habitantes', `${json.testsPerOneMillion}`)
                .setColor(config.defaultSuccessColor)
                .setFooter(`Covid-19 ${json.country}`, interaction.user.avatarURL({ dynamic: true }))
                .setTimestamp()

                return interaction.reply({ embeds: [embed]})

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
 