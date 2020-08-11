const fs = require('fs');
const Discord = require('discord.js');

const { prefix, token } = require('./config.json');
const { instantiateCronJobs } = require('./cronjob');
const { promiseTimeout } = require('./helpers/promiseTimeout');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const discordChannelIds = [];
const discordTextChannels = [];

async function login() {
  await client.login(token);
}

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

async function scheduleAnnouncements() {
  discordChannelIds.forEach((channelId) => {
    // Connect to text channels
    discordTextChannels.push(
      promiseTimeout(5000, client.channels.fetch(channelId))
    );
  });
  await Promise.allSettled(discordTextChannels);
  discordTextChannels.forEach((textChannel) => {
    instantiateCronJobs(textChannel);
  });
}

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);
  if (command.args && !args.length) {
    return message.channel.send(
      `You didn't provide any arguments, ${message.author}!`
    );
  }
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

login();
// scheduleAnnouncements();
