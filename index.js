const Discord = require('discord.js');
const { prefix, token, bossChannelId } = require('./config.json');
const { instantiateCronJobs } = require('./cronjob');
const { promiseTimeout } = require('./helpers/promiseTimeout');
const CronJob = require('cron').CronJob;
const client = new Discord.Client();

const discordChannelIds = ['739478211234103317','740393302217719870']
const discordTextChannels = []

async function login() {
  await client.login(token);
}

async function scheduleAnnouncements() {
  discordChannelIds.forEach(channelId => {
    // Connect to text channels
    discordTextChannels.push(promiseTimeout(5000, client.channels.fetch(channelId)))
  })
  await Promise.allSettled(discordTextChannels)
  discordTextChannels.forEach(textChannel => {
    instantiateCronJobs(textChannel)
  })
}

client.on('message', message => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    message.channel.send(`Administrator Response`)
  }
	if (message.content === `${prefix}ping`) {
		message.channel.send('Pong.');
	}
});

login();
scheduleAnnouncements();
