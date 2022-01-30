const { SlashCommandBuilder } = require('@discordjs/builders');

const {linksList} = require('./guides')
const {linksEmbed} = require('./guides')
const {putInfo} = require('./guides');

const removeGuide = (name) => {
    let index = 0;
    let guideFound = false;
    linksList.list.forEach(element => {
        if (element._name.toLowerCase() == name.toLowerCase()) {
            guideFound = true;
            linksEmbed.fields = [];
            linksList.list.splice(index, 1);
            putInfo()
            return;
        }
        index++;
    });
    
    if (!guideFound) {
        return false;
    }
    else {
        linksList.list.forEach(element => {
            linksEmbed.addFields({ name: element._name, value: `[Link](${element._link})` })
        })
        return true;
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-guide')
		.setDescription('Deletes a guide from the list of available guides!')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the guide')
                .setRequired(true)),
	async execute(interaction) {
        const guideRemoved = removeGuide(interaction.options.getString('name'))
        if(guideRemoved) {
            await interaction.reply('Sucessfully removed the guide');
        }
		else {
            await interaction.reply('Could not find the guide to remove');
        }
	},
};
