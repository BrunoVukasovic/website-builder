import Mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000,
    });

    console.log('Database connected...');
  } catch (err) {
    console.error('Error in config: ' + err.message);

    process.exit(1);
  }
};

export default connectDatabase;
