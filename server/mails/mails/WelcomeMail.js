const Button = require('../components/Button');

const WelcomeMailContent = () => `
<tr>
  <td align="left"
    style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
    <div
      style="font-family:Arial, sans-serif;font-size:14px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
      <p class="text-build-content" data-testid="g-3gwNNsRl"
        style="margin: 10px 0; margin-top: 10px;"><span
          style="color:#282215;font-family:Roboto;font-size:15px;line-height:22px;">Welcome to Vintage Poker and thank you for registering to our service!</p>
    </div>
  </td>
</tr>
${Button('Play now!', 'https://www.vintagepoker.app')}
<tr>
  <td align="left"
    style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
    <div
      style="font-family:Arial, sans-serif;font-size:14px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
      <p class="text-build-content" data-testid="BCd-ekutlT"
        style="margin: 10px 0; margin-top: 10px; margin-bottom: 10px;"><span
          style="color:#282215;font-family:Roboto;font-size:15px;line-height:24px;">Enjoy
          playing on our platform!</span></p>
    </div>
  </td>
</tr>
`;

module.exports = WelcomeMailContent;
