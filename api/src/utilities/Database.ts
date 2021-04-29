import mongoose from 'mongoose';

const server = `${process.env.MONGODB_SERVER}:27017`;
const database = `${process.env.MONGODB_DATABASE}`;

mongoose
  .connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });

export default mongoose;
