const mongoose=require("mongoose");
const {Schema}=mongoose;

// creating schema
const userSchema=new Schema({
    googleId:String
});

// model class- use to create a collection called users

mongoose.model("users",userSchema);