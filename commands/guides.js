const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton } = require('discord.js');
const fetch = require('node-fetch');
const link = require('../models/link');
require('dotenv').config();

const linksList = { list: [] };
const linksEmbed = new MessageEmbed()
    .setColor('#70766e')
    .setTitle('[Guides]')

const fetchInfo = async () => {

    const response = await fetch(process.env.JSONBIN,
        {
            headers: {
                "secret-key": process.env.MASTERKEY,
            }
        });
    const data = await response.json();

    let counter = 0;
    data.list.forEach(element => {
        linksList.list.push(new link(element._name, element._link));
        linksEmbed.addFields({ name: element._name, value: `[Link](${element._link})` });
        counter += 1;
    });
}
fetchInfo();

const addGuide = (name, newLink) => {
    linksList.list.push(new link(name, newLink));
    linksEmbed.addFields({ name: name, value: `[Link](${newLink})` })
}

const removeGuide = (name) => {
    let index = 0;
    let guideFound = false;
    linksList.list.forEach(element => {
        if (element._name.toLowerCase() == name.toLowerCase()) {
            guideFound = true;
            return;
        }
        index++;
    });
    if (!guideFound) {
        msg.channel.send(`The guide with the name: ${name} doesn't exist`)
        return;
    }
    else {
        linksList.list.splice(index - 1, 1);
        console.log(linksList);
    }
}

const putInfo = async () => {

    const response = await fetch('https://api.jsonbin.io/v3/b/61eb160c6c4a232f9d86c858/',
        {
            method: "PUT",
            body: JSON.stringify(linksList),
            headers: {
                "content-type": "application/json",
                "x-master-key": masterKey,
            }
        });
    console.log('Bot is ending');
    process.exit(0);
}

module.exports = {
    putInfo,
    data: new SlashCommandBuilder()
        .setName('guides')
        .setDescription('Replies with written guides')
        .addSubcommand(subcommand =>
            subcommand
                .setName('name')
                .setDescription('Name of the guide')
        )
    ,
    async execute(interaction) {
        await interaction.reply({ embeds: [linksEmbed] });
    },
};
