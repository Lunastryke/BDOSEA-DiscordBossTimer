// Instantiate cron jobs here
const CronJob = require('cron').CronJob;
const data = require('./boss-schedule.json');

function instantiateCronJobs(data) {
  createCronJob('test');
}

function createCronJob(jobDetails, channel) {
  var job = new CronJob(
    '* * * * * *',
    function () {
      channel.send('test');
    },
    null,
    true,
    'Asia/Singapore'
  );
  job.start();
}

module.exports.instantiateCronJobs = instantiateCronJobs;
