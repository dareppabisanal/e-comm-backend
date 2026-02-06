import dotenv from 'dotenv';
import connectToDB from './db/db-connection.js';

dotenv.config({
    path: "./env"
});

connectToDB();