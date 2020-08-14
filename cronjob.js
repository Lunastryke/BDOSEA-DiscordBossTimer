// Instantiate cron jobs here
const CronJob = require("cron").CronJob;
const { formatPost } = require('./helpers/postFormat')
const fs = require('fs')

const cronjobs = []

async function instantiateCronJobs(channel) {
  const bossData = fs.readFileSync('boss-schedule.json');
  const formattedBossData = JSON.parse(bossData);
  const bosses  = formattedBossData.bosses
  for (idx in bosses) {
    createCronJob(bosses[idx], channel)
  }
}

async function createCronJob(jobDetails, channel) {
  const {name, time, location} = jobDetails
  const formattedString = formatPost(name, time, location);
  var job = new CronJob(
    "1 * * * * *",
    function() {
      channel.send(formattedString)
    },
    null,
    true,
    "Asia/Singapore"
  );
  cronjobs.push(job);
  // job.start();
}

module.exports.instantiateCronJobs = instantiateCronJobs;
