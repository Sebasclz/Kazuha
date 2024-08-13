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

                if(paisString.length < 4 || paisString.length > 15) {
                    
                    const embedError = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('Escribe como minimo 4 caracteres y maximo 15 caracteres')
                    .setColor(config.defaultErrorColor)

                    return interaction.reply({ embeds: [embedError]})
                }

                if(paisString.includes("españa") || paisString.includes("España") || paisString.includes("eSPAÑA") || paisString.includes("ESPAÑA")){
                    superagent
                .get(`https://disease.sh/v3/covid-19/countries/spain`)
                .end((err, res) => {
                  const json = res.body

                    const embedError = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('El nombre del pais es invalido')
                    .setFooter('Los nombres de los paises no latinos se escriben en ingles', interaction.user.avatarURL({ dynamic: true }))
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
                })
            } else {
                superagent
                .get(`https://disease.sh/v3/covid-19/countries/${pais}`)
                .end((err, res) => {
                    const body = res.body
                    
                    const embedError = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('El nombre del pais es invalido')
                    .setFooter('Los nombres de los paises no latinos se escriben en ingles', interaction.user.avatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor(config.defaultErrorColor)
                    
                    if(body.message) return interaction.reply({ embeds: [embedError]})
                    
                    if(paisString.includes("Ñ") || paisString.includes("ñ")) {
                        const embedErr = new MessageEmbed()
                        .setTitle('Error')
                        .setDescription('No puedes poner una `ñ` en el nombre (Solo esta permitido `España`)')
                        .setColor(config.defaultErrorColor)
        
                        return interaction.reply({ embeds: [embedErr]})
                    }

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
            } catch { //Si da error le avisamos al usuario y lo reportamos al servidor
                interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setColor(config.defaultErrorColor)
                    .setTitle('Error')
                    .setDescription('Ha ocurrido algo mal, por favor revisa que no hayas puesto una letra no permitida en el idioma ingles o un pais que no es Latino America en español (Estos solo deben estar escrito en Ingles).')
                    .setTimestamp()
                    .setFooter(interaction.user.username, interaction.user.avatarURL())
                ]})
            };
        }
    }
 