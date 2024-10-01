import mongoose from 'mongoose';
const uri = 'mongodb+srv://asaf:Aa123456@cluster0.eslsq.mongodb.net/MTF-DB?retryWrites=true&w=majority';

export const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export const close = async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
};
