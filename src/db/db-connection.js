import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

export const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Connected to the database: ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDB;