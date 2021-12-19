require("dotenv").config();
const { mailer_user_1, mailer_pass_1 } = process.env;
const nodemailer = require("nodemailer");

const sendMail = async ({
  html = "",
  user = mailer_user_1,
  pass = mailer_pass_1,
  text = "",
  to = [],
  subject = "Inch Perfect",
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "business132.web-hosting.com",
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
    const from = `Inch Perfect <${user}>`;
    const info = await transporter.sendMail({
      subject,
      to,
      text,
      html,
      from,
    });
    return info;
  } catch (error) {
    console.log(error);
    throw "error sending mail";
  }
};
module.exports = sendMail;
