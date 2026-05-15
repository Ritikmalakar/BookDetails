import mongoose from 'mongoose'
export async function connectDb(){
  try{
await mongoose.connect(process.env.MONGO_URL);
console.log("connected succesfully");
  }catch(err){
    console.log(err);
  }
}