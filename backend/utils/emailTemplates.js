// Email template — password reset email customized with Zinc, Mauve, and Gray
export const getResetPasswordTemplate = (username, resetUrl) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title></title>
    <style type="text/css" rel="stylesheet" media="all">
      @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,600,700&display=swap");
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        -webkit-text-size-adjust: none;
      }

      a {
        color: #9d81b3; /* Mauve Accent link */
        text-decoration: none;
      }

      a img {
        border: none;
      }

      td {
        word-break: break-word;
      }

      .preheader {
        display: none !important;
        visibility: hidden;
        mso-hide: all;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
      }

      body,
      td,
      th {
        font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
      }

      h1 {
        margin-top: 0;
        color: #18181b; /* Zinc 900 */
        font-size: 22px;
        font-weight: bold;
        text-align: left;
      }

      td,
      th {
        font-size: 16px;
      }

      p,
      ul,
      ol,
      blockquote {
        margin: 0.4em 0 1.1875em;
        font-size: 16px;
        line-height: 1.625;
      }

      p.sub {
        font-size: 13px;
      }

      .align-center {
        text-align: center;
      }

      /* Premium Mauve Custom Button Style */
      .button {
        background-color: #8b5cf6; /* Vibrant Mauve */
        border-top: 12px solid #8b5cf6;
        border-right: 24px solid #8b5cf6;
        border-bottom: 12px solid #8b5cf6;
        border-left: 24px solid #8b5cf6;
        display: inline-block;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        -webkit-text-size-adjust: none;
        box-sizing: border-box;
      }

      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
          text-align: center !important;
        }
      }

      body {
        background-color: #f4f4f5; /* Zinc 100 Base Gray */
        color: #3f3f46; /* Zinc 700 Body Text */
      }

      p {
        color: #3f3f46; /* Zinc 700 */
      }

      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #f4f4f5;
      }

      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .email-masthead {
        padding: 30px 0;
        text-align: center;
      }

      .email-masthead_name {
        font-size: 20px;
        font-weight: bold;
        color: #18181b; /* Zinc 900 Branding Header */
        text-decoration: none;
        letter-spacing: -0.5px;
      }

      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #ffffff;
        border: 1px solid #e4e4e7; /* Zinc 200 Border Line */
        border-radius: 8px;
      }

      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }

      .email-footer p {
        color: #71717a; /* Zinc 500 Footer text */
      }

      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }

      .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #e4e4e7; /* Zinc 200 divider */
      }

      .content-cell {
        padding: 45px;
      }

      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
        }
      }

      @media (prefers-color-scheme: dark) {
        body,
        .email-body,
        .email-body_inner,
        .email-content,
        .email-wrapper,
        .email-masthead,
        .email-footer {
          background-color: #09090b !important; /* Zinc 950 Darkmode Background */
          color: #f4f4f5 !important;
          border-color: #27272a !important;
        }
        p,
        ul,
        ol,
        blockquote,
        h1,
        span {
          color: #f4f4f5 !important; /* Zinc 100 Darkmode Text */
        }
        .email-masthead_name {
          color: #ffffff !important;
        }
        .body-sub {
          border-top-color: #27272a !important;
        }
      }

      :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
      }
    </style>
  </head>
  <body>
    <span class="preheader">Use this link to reset your password. The link is only valid for 30 minutes.</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="email-masthead">
                <span class="f-fallback email-masthead_name">
                  GadgetLand
                </span>
              </td>
            </tr>

            <tr>
              <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell">
                      <div class="f-fallback">
                        <h1>Hi ${username},</h1>
                        <p>
                          You recently requested to reset your password for your
                          GadgetLand account. Use the button below to safely update it.
                          <strong>This password reset is only valid for the next 30 minutes.</strong>
                        </p>

                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                <tr>
                                  <td align="center">
                                    <a href="${resetUrl}" class="f-fallback button" target="_blank">Reset your password</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <p>
                          If you did not request a password reset, please safely ignore this email or reach out to our support channel if you have any safety concerns.
                        </p>
                        <p>Warm regards, <br />The GadgetLand Team</p>

                        <table class="body-sub" role="presentation">
                          <tr>
                            <td>
                              <p class="f-fallback sub">
                                If you’re having trouble with the button above, copy and paste the direct URL below into your web browser.
                              </p>
                              <p class="f-fallback sub">
                                <a href="${resetUrl}">${resetUrl}</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="f-fallback sub align-center">
                        GadgetLand Inc.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;