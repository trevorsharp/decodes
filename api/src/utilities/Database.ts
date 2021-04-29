import mongoose from 'mongoose';

const server = '127.0.0.1:27017';
const database = 'dacodeaz';

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
