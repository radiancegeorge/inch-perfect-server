const asyncHandler = require("express-async-handler");
const sendMail = require("../../utils/mailer");
const formatContactMessage = require("./formatContactMail");

const sendMessage = asyncHandler(async (req, res, next) => {
  const { body } = req;
  if (!body.email || !body.message) throw "no empty fields";
  try {
    await sendMail({
      to: "contact@inchperfectstores.com",
      html: formatContactMessage({
        email: body.email,
        fullName: body.fullName,
        username: body.username,
        message: body.message,
      }),
    });
    res.status(200).json({
      message: "sent",
    });
  } catch (err) {
    if (err) throw "error sending message!";
  }
});

module.exports = sendMessage;
