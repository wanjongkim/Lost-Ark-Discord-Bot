const fetch = require('node-fetch');
require('dotenv').config();
const jeffWalletURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${process.env.STEAM_PLAYER}&format=json&include_played_free_games=true`;
const { SlashCommandBuilder } = require('@discordjs/builders');

const jeffInfo = async () => {
    let games = undefined;
    await fetch(jeffWalletURL).then(data => {
        return data.json();
    }).then(dataJSON => {
        games = dataJSON.response.game_count;
    })
    return games;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jeff-wallet')
        .setDescription('Replies with Jeffrey\'s Steam Wallet'),
    async execute(interaction) {
        const games = await jeffInfo();
        await interaction.reply(`jeffrey's rich and has ${games} games and DLCs.`);
    }
}