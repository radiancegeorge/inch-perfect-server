const asyncHandler = require("express-async-handler");
const genOTP = require("../../utils/genOTP");
const sendMail = require("../../utils/mailer");
const {
  checkEmail,
  hashText,
  updateUser,
} = require("../../utils/registration");

const requestOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const isMailValid = await checkEmail(email);
  if (!isMailValid) throw new Error("Email not found!");

  await sendMail({
    html: `
            <p style="font-size: 20px">Please use the OTP below to proceed with your request</p>
            <h4>${await genOTP(4)}</h4>
        `,
    to: [email],
    subject: "Authorization",
  });

  res.status(200).json({ message: "An otp has been sent to your email!" });
});

const patchUser = asyncHandler(async (req, res, next) => {
  const { new_password, re_new_password, email } = req.body;
  if (!email) throw "email cannot be empty";
  if (new_password === "") throw "Password cannot be an empty string";

  if (new_password !== re_new_password) throw "Passwords do not match!";

  const password = await hashText(new_password);

  await updateUser({ password }, email);

  res.status(200).json({ message: "Your password has been updated!" });
});

module.exports = {
  patchUser,
  requestOtp,
};
