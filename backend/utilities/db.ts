import mongoose from 'mongoose';

const dbConnect = async (): Promise<void> => {
    console.log('Connecting to database');
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log('Database connected..');
    } catch (err: any) {
        console.log('Database connection failed');
        console.log(err.message);
    }
};

export default mongoose;
export { dbConnect };