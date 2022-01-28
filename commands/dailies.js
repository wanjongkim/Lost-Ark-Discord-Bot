const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const una = new MessageEmbed().addFields({
    name: "Una's Task Vendor",
    value: `
Southeast Tripod in Vern Castle

(Complete 3 tasks daily) - Recommended to buy the largest gold chest
• Accessible through "Epona's Journal" (default hotkey Alt+J)
• Can be found inside major cities
• Unlocks at lvl 50 \n`})

const guild = new MessageEmbed().addFields({
    name: "Guild Dailies", 
    value: `
Inside the North church building in Vern Castle

(Do guild dailies and donate a set amount of silver) - Recommended to buy equipment upgrade parts
• Can be found inside major cities
• Unlocks at start so join ASAP`})

const misc = new MessageEmbed().addFields({
    name: "Miscellaneous",
    value: `
    Chaos Dungeon vendor (Do Chaos Daily Dungeons) - Recommended to buy one time purchase of 20 green engraving books of choice to launch ahead
    • Can be found inside major cities
    • Unlocks at lvl 50
    
    Traveling merchant ship (Do co-op voyage dailies) - Recommended to buy equipment upgrade parts
    • Can be found outside major docks
    • Unlocks at lvl 50

    Guardian Raid (Do Daily Guardian Dungeons) - Recommended to buy equipment upgrade parts after buying 20 uncommon engraving books
    • https://thegamescabin.com/lost-ark-guardian-raid-guide/ for more information on complete guide.
    • Unlocks at lvl 50
    
    Life Skill (Platinum Field for good trade items but it requires tickets which is dropped randomly doing life skill)

    `
})

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailies')
        .setDescription('Replies with dailies'),
    async execute(interaction) {
        await interaction.reply({ embeds: [una], files: [{ attachment: './assets/pictures/unas_task.png', description: "Southeast Tripod in Vern Castle" }], ephemeral: true });
        await interaction.followUp({ embeds: [guild], files: [{attachment: './assets/pictures/guild vendor.png', description: 'Inside the North church building in Vern Castle'}], ephemeral: true });
        await interaction.followUp({embeds: [misc], files: [{attachment: './assets/pictures/chaos.png'}], ephemeral: true })
    },
};
