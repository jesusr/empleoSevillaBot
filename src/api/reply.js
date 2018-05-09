const Twit = require('twit'),
  unique = require('unique-random-array'),
  config = require('../config'),
  param = config.twitterConfig,
  randomReply = unique(param.randomReply.split('|')),
  bot = new Twit(config.twitterKeys);

function tweetNow(text) {
  bot.post('statuses/update', {
    status: text
  }, (err, data, response) => {
    if (err) console.lol('ERRORDERP Reply', err);
    else console.lol('SUCCESS: Replied: ', text);
  });
}

module.exports = event => {
  let screenName = event.source.screen_name;

  if (screenName === config.twitterConfig.username) return;
  const response = randomReply(),
    res = response.replace('${screenName}', screenName);
  tweetNow(res);
};
