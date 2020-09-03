/**
 *
 * @param {String} linkText The link text
 * @param {String} linkUrl The link URI
 */
const Link = (linkText, linkUrl) => `
<a target="_blank" href="${linkUrl}"><span
style="color:#245069;font-family:Roboto;font-size:15px;line-height:22px;"><b>${linkText}</b></span></a>
  `;

module.exports = Link;
