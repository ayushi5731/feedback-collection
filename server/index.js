const express= require ('express');
const app=express();

const port=5000;

app.get("/",(req,res)=>{
    res.send({hi:"there"});
})

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})