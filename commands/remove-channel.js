const { Guilds } = require('./db.js');
module.exports = {
    name: 'remove-channel',
    description: 'Removes bot from current channel',
    args: false,
    execute(message, args) {
        console.log(message.channel.id)
    },
  };
  