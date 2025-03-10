import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import bookRoutes from "./Routes/book.route.js"

dotenv.config();
const app = express();

app.use(express.json());
const port = process.env.PORT || 3200;
const URL = process.env.MONGO_URL;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

connectToMongoDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/api",bookRoutes)