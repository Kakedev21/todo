const mongoose = require("mongoose");

const connect = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `mongodb connected: ${response.connection.host}`.cyan.underline.bold
    );
    return response;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connect;
