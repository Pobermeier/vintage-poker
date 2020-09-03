/**
 *
 * @param {String} btnText The caption of the CTA button
 * @param {String} linkUrl The button URL
 */
const Button = (btnText, linkUrl) => `
<tr>
  <td align="center" vertical-align="middle"
    style="font-size:0px;padding:10px 25px 10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
      style="border-collapse:separate;line-height:100%;">
      <tr>
        <td align="center" bgcolor="#245069" role="presentation"
          style="border:0px solid #ffffff;border-radius:30px;cursor:auto;mso-padding-alt:10px 25px 10px 25px;background:#245069;"
          valign="middle"><a href="${linkUrl}"
            style="display:inline-block;background:#245069;color:#ffffff;font-family:Arial, sans-serif;font-size:22px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px 10px 25px;mso-padding-alt:0px;border-radius:30px;"
            target="_blank"><span
              style="background-color:transparent;color:#ffffff;font-family:Playfair Display, Helvetica, Arial, sans-serif;font-size:22px;">${btnText}</span></a></td>
      </tr>
    </table>
  </td>
</tr>
`;

module.exports = Button;
