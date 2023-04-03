const {Client, Events, GatewayIntentBits} = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on(Events.MessageCreate, async (message) => {
  console.log("Received message")
  if (message.content === '!join') {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      console.log(`Joined voice channel: ${connection.channel.name}`);

      const user = message.author;
      const voiceChannel = message.member.voice.channel;

      // Create a new voice receiver for the user
      const receiver = connection.receiver;
      const voiceStream = receiver.createStream(user, { mode: 'pcm' });

      // Track the user's speaking status
      voiceChannel.members.forEach((member) => {
        member.voice.on('speaking', (user, speaking) => {
          if (user.id === voiceStream.user.id) {
            console.log(`${user.username} is ${speaking ? 'speaking' : 'not speaking'}`);
            // Change the image displayed based on the user's speaking status
          }
        });
      });
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});

client.login(config.DISCORD_BOT_TOKEN);