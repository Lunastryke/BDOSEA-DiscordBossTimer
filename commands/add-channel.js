const { Guilds } = require('./db.js');
module.exports = {
    name: 'add-channel',
    description: 'Adds bot to current channel',
    args: false,
    execute(message, args) {
      console.log(message.channel.id)
    },
  };
  