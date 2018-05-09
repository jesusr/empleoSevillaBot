const createServer = require('http').createServer,
  Twit = require('twit'),
  config = require('./config'),
  consoleLol = require('console.lol'),
  bot = new Twit(config.twitterKeys),
  retweet = require('./api/retweet'),
  reply = require('./api/reply'),
  userStream = bot.stream('user');
console.rofl('Bot starting...');
retweet();
setInterval(retweet, config.twitterConfig.retweet);
userStream.on('follow', reply);
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  });
  res.end();
});
server.listen(3000);
