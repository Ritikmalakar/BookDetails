import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDb } from './config/db.js';
import bookRoutes from './routes/bookRoutes.js'
import cors from 'cors';
const app=express();

app.use(express.json());
app.use(cors());
app.use("/api",bookRoutes)
async function serverStart(){
  try{
await connectDb();
app.listen(process.env.PORT,()=>{
  console.log("server start");
})
  }catch(err){
    console.log(err);
  }
}
serverStart();