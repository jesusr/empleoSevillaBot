const Twit = require('twit'),
  unique = require('unique-random-array'),
  config = require('../config'),
  isReply = require('../helpers/isReply'),
  param = config.twitterConfig,
  bot = new Twit(config.twitterKeys);

module.exports = retweet = () => {
  bot.get('search/tweets', {
    q: unique(param.queryString.split(','))(),
    result_type: param.resultType,
    lang: param.language,
    filter: 'safe',
    count: param.searchCount
  }, (err, data) => {
    if (err) console.lol('ERRORDERP: Cannot Search Tweet!, Description here: ', err);
    else {
      // grab random tweet ID to retweet - desired range for random number is [0..data.statuses.length-1]
      const rando = Math.floor(Math.random() * data.statuses.length);
      let retweetId;
      if (!isReply(data.statuses[rando])) retweetId = data.statuses[rando].id_str;
      bot.post('statuses/retweet/:id', {
        id: retweetId
      }, (err, response) => {
        if (err) {
          console.lol('ERRORDERP: Retweet!');
        }
        console.lol('SUCCESS: RT: ', data.statuses[rando].text, 'RANDO ID: ', rando);
      });
    }
  });
};
