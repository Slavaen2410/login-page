import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://slavaen2410:kisusha2410@login-page.llwgi.mongodb.net/?retryWrites=true&w=majority&appName=login-page', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Завершаем процесс в случае ошибки
  }
};

export default connectDB;
