
const axios = require("axios");

exports.verifyFacebookToken = async (token) => {
  // simplified validation
  const res = await axios.get(
    `https://graph.facebook.com/me?access_token=${token}`
  );
  return res.data;
};
