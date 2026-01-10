import {model, Schema } from "mongoose";
import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ayushxdev347_db_user:JdItapydA2N0Cbmc@brainly.xehbvdn.mongodb.net/?appName=brainly");

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error);
    process.exit(1); // stop app if DB fails
  }
  
};
const Userschema  = new Schema({
    username: {type: String, unique: true} ,
    password:  String 
})

const ContentSchema = new Schema({
    title:{type: String, required: true},
    link:{type: String},
    tags:[{type: mongoose.Types.ObjectId, ref:'tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'user' , required: true }
})

const LinkSchema = new Schema({
  hash: String,
  userId: {type:mongoose.Types.ObjectId, ref:'user' , required: true, unique: true }
})

export const Linkmodel = model("link",LinkSchema)
export const Usermodel = model("user",Userschema);
export const Contentmodel = model("content",ContentSchema);
