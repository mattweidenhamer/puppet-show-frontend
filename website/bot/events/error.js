const { Events } = require("discord.js");

module.exports = {
  name: Events.error,
  execute(client) {
    console.error;
  },
};
