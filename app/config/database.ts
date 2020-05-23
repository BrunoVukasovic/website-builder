const mongoose = require("mongoose");

require("dotenv").config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("Database connected...");
  } catch (err) {
    console.error("Error in config: " + err.message);
    process.exit(1);
  }
};

export default connectDatabase;
