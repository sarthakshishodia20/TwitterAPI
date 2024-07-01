const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");

app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


let posts=[
    {
        id:uuidv4(),
        username:"msdhoni",
        content:"If I keep going to the farm there won’t be any strawberry left for the market"
    },
    {
        id:uuidv4(),
        username:"apnaCollege",
        content:"Hello We are Learning REST API's Today"
    },
    {
        id:uuidv4(),
        username:"Virat Kohli",
        content:"You know whats the biggest challenge in cricket? ",
    }
];


app.get("/",(req,res)=>{
    res.send("Server is working well");
});

app.get("/posts",(req,res)=>{
    // res.send("post is working");
    res.render("index",{posts});

})
app.get("/posts/new",(req,res)=>{
    res.render("new");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let post=posts.find((p)=>id===p.id);
    res.render("show",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id==p.id);
    post.content=newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("edit",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("App is listening on port 3000");
});

