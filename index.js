const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { instantiateCronJobs } = require('./cronjob');
const CronJob = require('cron').CronJob;
const client = new Discord.Client();

async function doStuff() {
  await client.login(token);
  const bossChannel = await client.channels.fetch('739478211234103317');
  var job = new CronJob(
    '* * * * * *',
    function () {
      bossChannel.send('testing');
    },
    null,
    true,
    'Asia/Singapore'
  );
  job.start();
}

doStuff();
