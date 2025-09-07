import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import PropertyRoutes from './routes/propertyRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

//middlewaeres
app.use(cors({
    origin: [
        "http://localhost:3000", // local dev
        "https://mini-property-rdbcjtjbk-himanshu-bishts-projects-536830eb.vercel.app/" // deployed frontend
    ],
    credentials: true,
}));app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", PropertyRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Mongo DB connected");
    })
    .catch((err)=>{
        console.log(err);
    });

    
// app.get('/',(req,res)=>{
//     console.log('Hello World');
//     res.send('Hello World from backend 🚀');

// })

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})