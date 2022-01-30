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
    const response = await fetch(`https://api.jsonbin.io/v3/b/${process.env.JSONBIN}/latest`,
        {
            headers: {
                "X-MASTER-KEY": process.env.MASTERKEY,
            }
        });
    const data = await response.json();
    let counter = 0;
    data.record.list.forEach(element => {
        linksList.list.push(new link(element._name, element._link));
        linksEmbed.addFields({ name: element._name, value: `[Link](${element._link})` });
        counter += 1;
    });
}
fetchInfo();

const putInfo = async () => {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${process.env.JSONBIN}`,
            {
                method: "PUT",
                body: JSON.stringify(linksList),
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": process.env.MASTERKEY
                }
            });
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    putInfo: putInfo,
    linksList: linksList,
    linksEmbed: linksEmbed,
    data: new SlashCommandBuilder()
        .setName('guides')
        .setDescription('Replies with written guides')
    ,
    async execute(interaction) {
        await interaction.reply({ embeds: [linksEmbed] });
    }
}
