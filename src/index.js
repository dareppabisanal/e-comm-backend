import dotenv from 'dotenv';
import connectToDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: "./.env"
});

connectToDB()
.then(() => {
    console.log("Connected to DB successfully");

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("Failed to connect to DB!", err);
});