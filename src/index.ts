import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import{Usermodel,connectDB,Contentmodel} from "./db.js";
await connectDB();
import { jwt_password } from "./config.js";
import { userMiddleware } from "./middleware.js";
const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.json({message:"http server is working"})
})

app.post("/api/v1/signup", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
try{  await  Usermodel.create({
        username,
        password
    })

    res.json({message:"User signed Up"})}
    catch{
        res.status(411).json({message: "Username already registered"})
    }
 
    
})
app.post("/api/v1/signin",async (req,res) => {
   const username = req.body.username;
    const password = req.body.password;
    
        const existinguser = await Usermodel.findOne({
        username,
        password
    })
    if(existinguser){
        const token = jwt.sign({
            id: existinguser.id,

        },jwt_password)

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
    

})
app.post("/api/v1/content",userMiddleware, async (req,res) => {
    const title = req.body.title;
    const link = req.body.link;
    

    await Contentmodel.create({
        title,
        link,
        //@ts-ignore
        userId: req.userId,
        tags: []
        
    })

    return res.json({
        message: "Content added"
    })


})
app.get("/api/v1/content",userMiddleware, async(req,res) =>{
    //@ts-ignore
   const userId = req.userId;
   const content = await Contentmodel.find({
    userId: userId
   }).populate("userId","username")
   res.json({
    content
   })

})
app.delete("/api/v1/delete",userMiddleware, async (req,res) => {
    const contentId = req.body.contentId;
     //@ts-ignore
     const userId = req.userId
    await Contentmodel.deleteMany({
        contentId,
        userId
    })

    res.json({message: "content deleted"})
    
}) 
app.post("/api/v1/brain/share",(req,res) => {

})

app.listen(3000);