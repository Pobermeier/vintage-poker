/**
 *
 * @param {String} title The mail title as a text string
 * @param {String} username The username of the recipient
 * @param {String} content The mail content as a string of HTML
 */
const MainLayout = (
  title = 'Untitled mail',
  username = '{{nickname}}',
  content = '<h1>Content goes here</h1>',
) => `
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>${title}</title>
  <!--[if !mso]>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    a {
      text-decoration: none !important;
      color: #245069;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

    @media screen and (min-width: 624px) {
      .header {
        margin: 32px auto 0 auto !important;
      }
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
    @import url(https://fonts.googleapis.com/css?family=Playfair+Display);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style type="text/css">
    [owa] .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
</head>

<body style="background-color:#f7f3de;">
  <div style="background-color:#f7f3de;">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#e2d7bb;background-color:#e2d7bb;margin:0 auto;max-width:600px;" class="header">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#e2d7bb;background-color:#e2d7bb;width:100%;">
        <tbody>
          <tr>
            <td
              style="border:0px solid #ffffff;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tr>
                    <td align="center"
                      style="font-size:0px;padding:20px 0px 20px 0px;padding-top:20px;padding-right:0px;padding-bottom:20px;padding-left:0px;word-break:break-word;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="border-collapse:collapse;border-spacing:0px;">
                        <tbody>
                          <tr>
                            <td style="width:250px;"><a href="https://www.vintagepoker.app" target="_blank"><img
                                  alt="Vintage Poker" height="auto"
                                  src="https://images.ctfassets.net/4tlsutsg5se1/nYWFnuZzTZW8J3KeNoifT/b795af5e05cc6fd9c0cbfa7a3950b32a/logo-text_3x.png"
                                  style="border:none;border-radius:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                  width="250"></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#eae1cd;background-color:#eae1cd;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="background:#eae1cd;background-color:#eae1cd;width:100%;">
        <tbody>
          <tr>
            <td
              style="border:0px solid #ffffff;direction:ltr;font-size:0px;padding:16px 0px 24px 0px;padding-bottom:24px;padding-left:0px;padding-right:0px;padding-top:16px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tr>
                    <td align="left"
                      style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                      <div
                        style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                        <h2 class="text-build-content" data-testid="i8L8HViE9W"
                          style="margin-top: 10px; margin-bottom: 10px"><span
                            style="color:#245069;font-family:Playfair Display, Helvetica, Arial, sans-serif;font-size:24px;">Hi
                            ${username}!</span></h2>
                      </div>
                    </td>
                  </tr>
                  ${content}
                  <tr>
                    <td align="left"
                      style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-right:25px;padding-bottom:0px;padding-left:25px;word-break:break-word;">
                      <div
                        style="font-family:Arial, sans-serif;font-size:14px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                        <p class="text-build-content" data-testid="RB_XdJ1yXO"
                          style="margin: 10px 0; margin-top: 10px; margin-bottom: 10px;"><span
                            style="color:#282215;font-family:Roboto;font-size:15px;line-height:10px;"><i>The Vintage
                              Poker Team</i></span></p>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:transparent;background-color:transparent;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="background:transparent;background-color:transparent;width:100%;">
        <tbody>
          <tr>
            <td
              style="border:0px solid #ffffff;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix"
                style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                  width="100%">
                  <tr>
                    <td align="left"
                      style="font-size:0px;padding:8px 20px 8px 20px;padding-top:8px;padding-right:20px;padding-bottom:8px;padding-left:20px;word-break:break-word;">
                      <div
                        style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                        <p class="text-build-content"
                          style="text-align: center; margin: 10px 0; margin-top: 10px; margin-bottom: 10px;"
                          data-testid="v8eZLeSfkPK"><span
                            style="color:#245069;font-family:Roboto;font-size:13px;line-height:13px;">© 2020 Vintage
                            Poker. All rights reserved.</span></p>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
`;

module.exports = MainLayout;
