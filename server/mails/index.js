const MainLayout = require('./components/MainLayout');
const WelcomeMailContent = require('./content/WelcomeMail');

const WelcomeMail = (username = '{{nickname}}') => ({
  id: 1,
  name: '001 | Registration Welcome',
  subject: 'Welcome to Vintage Poker!',
  text: ((username) =>
    `Hi ${username}!\n\nWelcome to Vintage Poker and thank you for registering to our service!\n\nPlay now: https://www.vintagepoker.app \n\nEnjoy playing on our platform!\n\nThe Vintage Poker Team
    `)(username),
  html: ((username) =>
    `${MainLayout(
      'Welcome to Vintage Poker',
      username,
      WelcomeMailContent(),
    )}`)(username),
});

module.exports = {
  WelcomeMail,
};
