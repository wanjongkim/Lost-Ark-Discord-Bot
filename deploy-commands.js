require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

if (process.env.PRODUCTION === 'TEST') {
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
        .then(() => console.log('Successfully registered GUILD application commands.'))
        .catch(console.error)
}
else {
    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
        .then(() => console.log('Successfully registered GLOBAL application commands.'))
        .catch(console.error)
}
