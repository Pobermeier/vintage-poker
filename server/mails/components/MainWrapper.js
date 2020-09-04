const MainWrapper = (content) => `
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
                  ${content}
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
`;

module.exports = MainWrapper;
