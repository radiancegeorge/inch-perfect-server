require("dotenv").config();
const paystack = require("paystack-api")(process.env.paystackKey);

const handlePayment = async () => {};

const listBanks = async () => {
  const banks = await paystack.misc.list_banks({
    country: "Nigeria",
    currency: "NGN",
  });
  //   console.log(banks);
  return banks;
};

module.exports = {
  handlePayment,
};
