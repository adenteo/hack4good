import mongoose from 'mongoose';

//init connection 
const connectMongo = async () => {
  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  db.once('open', () => {
    console.log('MongoDB connection established successfully');
  });
  if (db.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
};

export default connectMongo;
