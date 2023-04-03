const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder().setName('join').setDescription('Joins the voice channel'),
    async execute(interaction) {
        guild = interaction.guild;
    }
}