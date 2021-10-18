const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const config = require('../../config.json')
const DIG = require('discord-image-generation')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('images')
        .setDescription('Devuelve comandos de personalizacion de imagenes')
        
        //Command 1
        .addSubcommand(subcommand => 
            subcommand
            .setName('beautiful')
            .setDescription('Di que sos hermoso'))

        //Command 2
        .addSubcommand(subcommand => 
            subcommand
            .setName('gay')
            .setDescription('Dile a alguien que sos o es gay')
            .addUserOption(option =>
            option.setName('user')
            .setDescription('Menciona al usuario')))

        //Command 3
        .addSubcommand(subcommand => 
            subcommand
            .setName('invert')
            .setDescription('Invierte los colores de tu avatar'))

        //Command 4
        .addSubcommand(subcommand => 
            subcommand
            .setName('delete')
            .setDescription('Borrate a vos mismo o a alguien')
            .addUserOption(option =>
            option.setName('user')
            .setDescription('Menciona al usuario')))

        //Command 4
        .addSubcommand(subcommand => 
            subcommand
            .setName('rip')
            .setDescription('Pon tu avatar o la de otro en el meme del RIP')
            .addUserOption(option =>
            option.setName('user')
            .setDescription('Menciona al usuario')))

        //Command 5
        .addSubcommand(subcommand => 
            subcommand
            .setName('spank')
            .setDescription('Dale nalgadas a un usuario')
            .addUserOption(option =>
            option.setName('user')
            .setDescription('Menciona al usuario')
            .setRequired(true)))

        //Command 6
        .addSubcommand(subcommand => 
            subcommand
            .setName('trash')
            .setDescription('Una imagen para decir que vos sos o alguien mas es igual a la basura')
            .addUserOption(option =>
            option.setName('user')
            .setDescription('Menciona al usuario')))

        //Command 7
        .addSubcommand(subcommand => 
            subcommand
            .setName('wanted')
            .setDescription('Una imagen de buscado con tu avatar o con la de otro usuario')
            .addUserOption(option =>
            option.setName('user')
            .setDescription('Menciona al usuario'))),
    async run(client, interaction){
        if(interaction.options.getSubcommand() === "beautiful"){
            /*
            BEAUTIFUL
            */
        try{
            const avatar = interaction.user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

            const img = await new DIG.Beautiful().getImage(avatar) //Convertimos el avatar en el meme
            
            const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen

            interaction.reply({ files: [attach]}) //Enviamos la imagen
        } catch(e){
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
    } else if(interaction.options.getSubcommand() === "gay"){
        /*
        GAY
        */
        try{
            const user = interaction.options.getUser('user')

            if(user){ //Si menciona a alguien
                const avatar = user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

                const img = await new DIG.Gay().getImage(avatar) //Le ponemos el filtro de gay
    
                const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo
    
                interaction.reply({ files: [attach]}) //Enviamos la imagen
            } else { //Si no menciona a nadie
            const avatar = interaction.user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

            const img = await new DIG.Gay().getImage(avatar) //Le ponemos el filtro de gay

            const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo

            interaction.reply({ files: [attach]}) //Enviamos la imagen
            
        }

        } catch(e){
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
    } else if(interaction.options.getSubcommand() === "invert"){
        /*
        INVERT
        */
        try{
            const avatar = interaction.user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

            const img = await new DIG.Invert().getImage(avatar) //Convertimos el avatar en el meme
            
            const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen

            interaction.reply({ files: [attach]}) //Enviamos la imagen
        } catch(e){
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
    } else if(interaction.options.getSubcommand() === "delete"){
        /*
        DELETE
        */
        try{
            const user = interaction.options.getUser('user')

            if(user){ //Si menciona a alguien
                const avatar = user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

                const img = await new DIG.Delete().getImage(avatar) //Le ponemos el filtro de DELETE
    
                const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo
    
                interaction.reply({ files: [attach]}) //Enviamos la imagen
            } else { //Si no menciona a nadie
            const avatar = interaction.user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

            const img = await new DIG.Delete().getImage(avatar) //Le ponemos el filtro de DELETE

            const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo

            interaction.reply({ files: [attach]}) //Enviamos la imagen
            
        }

        } catch(e){
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
    } else if(interaction.options.getSubcommand() === "rip"){
        /*
        RIP
        */
        try{
            const user = interaction.options.getUser('user')

            if(user){ //Si menciona a alguien
                const avatar = user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

                const img = await new DIG.Rip().getImage(avatar) //Le ponemos el filtro de RIP
    
                const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo
    
                interaction.reply({ files: [attach]}) //Enviamos la imagen
            } else { //Si no menciona a nadie
            const avatar = interaction.user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

            const img = await new DIG.Rip().getImage(avatar) //Le ponemos el filtro de RIP

            const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo

            interaction.reply({ files: [attach]}) //Enviamos la imagen
            
        }

        } catch(e){
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
    } else if(interaction.options.getSubcommand() === "spank"){
        /*
        SPANK
        */
        try{
            const user = interaction.options.getUser('user') //Obtenemos el usuario mencionado

            const avatar = interaction.user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar
            const avatar2 = user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el segundo avatar

            const img = await new DIG.Spank().getImage(avatar, avatar2) //Convertimos el avatar en el meme
            
            const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen

            interaction.reply({ files: [attach]}) //Enviamos la imagen
        } catch(e){
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
    } else if(interaction.options.getSubcommand() === "trash"){
        /*
        TRASH
        */
        try{
            const user = interaction.options.getUser('user')

            if(user){ //Si menciona a alguien
                const avatar = user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

                const img = await new DIG.Trash().getImage(avatar) //Le ponemos el filtro de Trash
    
                const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo
    
                interaction.reply({ files: [attach]}) //Enviamos la imagen
            } else { //Si no menciona a nadie
            const avatar = interaction.user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

            const img = await new DIG.Trash().getImage(avatar) //Le ponemos el filtro de Trash

            const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo

            interaction.reply({ files: [attach]}) //Enviamos la imagen
            
        }

        } catch(e){
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
    }else if(interaction.options.getSubcommand() === "wanted"){
        /*
        WANTED
        */
        try{
            const user = interaction.options.getUser('user')

            if(user){ //Si menciona a alguien
                const avatar = user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

                const img = await new DIG.Wanted().getImage(avatar) //Le ponemos el filtro de gay
    
                const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo
    
                interaction.reply({ files: [attach]}) //Enviamos la imagen
            } else { //Si no menciona a nadie
            const avatar = interaction.user.displayAvatarURL({ dynamic: true, format: 'png'}) //Obtenemos el avatar

            const img = await new DIG.Wanted().getImage(avatar) //Le ponemos el filtro de gay

            const attach = new MessageAttachment(img, "output.png") //Lo convertimos en una imagen para poder enviarlo

            interaction.reply({ files: [attach]}) //Enviamos la imagen
            
        }

        } catch(e){
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
}