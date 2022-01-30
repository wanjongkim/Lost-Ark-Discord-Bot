const { SlashCommandBuilder } = require('@discordjs/builders');
const {linksList} = require('./guides')
const {linksEmbed} = require('./guides')
const link = require('../models/link')
const {putInfo} = require('./guides')

const addGuide = (name, newLink) => {
    try {
        linksList.list.push(new link(name, newLink));
        linksEmbed.addFields({ name: name, value: `[Link](${newLink})` })
        putInfo();
    } catch(err) {
        return false;
    }
    return true;
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-guide')
		.setDescription('Adds a guide to the list of available guides')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the guide')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('link')
                .setDescription('The link to the guide')
                .setRequired(true)
            ),
	async execute(interaction) {
        const guideAdded = addGuide(interaction.options.getString('name'), interaction.options.getString('link'))
		if(guideAdded) {
            await interaction.reply('Guide added successfully');
        }
        else {
            await interaction.reply('There was an error adding the guide');
        }
	},
};
