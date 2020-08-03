const Discord = require('discord.js');
const { prefix, token, bossChannelId } = require('./config.json');
const { instantiateCronJobs } = require('./cronjob');
const CronJob = require('cron').CronJob;
const client = new Discord.Client();

async function doStuff() {
  await client.login(token);
  const bossChannel = await client.channels.fetch(bossChannelId);
  instantiateCronJobs(bossChannel)
}

doStuff();
