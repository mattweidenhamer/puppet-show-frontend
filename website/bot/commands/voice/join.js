const { SlashCommandBuilder, channelMention } = require("discord.js");
const {
  entersState,
  joinVoiceChannel,
  VoiceConnection,
  VoiceConnectionStatus,
  AudioPlayerStatus,
  getVoiceConnection,
} = require("@discordjs/voice");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Joins the voice channel"),
  async execute(interaction) {
    //If this was called from DMs, return and send a message
    if (!interaction.guild)
      return interaction.reply(":x:: You can't use this command in DMs!");
    // If the user is not in a voice channel, return and send a message
    if (!interaction.member.voice.channel)
      return interaction.reply(":x:: You need to join a voice channel first!");
    // If the bot is already in a voice channel in the same guild, return and send a message
    if (interaction.guild.members.me.voice.channel)
      return interaction.reply(
        ":x:: I'm already in a voice channel! /nIf you want me to leave, type /leave first."
      );
    // If the bot is not in a voice channel in the same guild, join it and add an event listener to the bot.
    interaction.reply(
      `:white_check_mark: Joining ${channelMention(
        interaction.member.voice.channelId
      )}`
    );
    channel = interaction.member.voice.channel;
    console.log(channel.guild.voiceAdapterCreator);
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    })
      .on("debug", console.log)
      .on("error", console.error);
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log(
        `Successfully loaded voice state in channel ${interaction.member.voice.channel.name}`
      );
    });
    connection.on("stateChange", (oldState, newState) => {
      console.log(
        `Voice connection transitioned from ${oldState.status} to ${newState.status}`
      );
    });
    connection.receiver.speaking.on("end", (userId) => {
      console.log(`User ${userId} stopped speaking`);
    });
    connection.receiver.speaking.on("start", (userId) => {
      console.log(`User ${userId} started speaking`);
    });
    connection.on(
      VoiceConnectionStatus.Disconnected,
      async (oldState, newState) => {
        console.error(
          `Unexpectedly disconnected from voice call, beginning reconect race...`
        );
        try {
          await Promise.race([
            entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
            entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
          ]);
        } catch (error) {
          connection.destroy();
          console.error(
            `Failed to reconnect to voice channel after 5 seconds, destroying connection.`
          );
        }
      }
    );
    console.log("Joined voice channel.");
  },
};
