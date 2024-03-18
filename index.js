const express = require("express");
const app = express();
const port = 8080;
const path =require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts =[
   {
    id: uuidv4(),
        username: "prachi",
        content: "she is a cyber security head of india"
    },
    {
        id: uuidv4(),
        username: "parul",
        content: "he is a prachi's bestfriend"
    },
    {
        id: uuidv4(),
        username: "sourav",
        content: "he hates parul"
    },
    {
        id: uuidv4(),
        username: "suyasha",
        content: "she loves ritwik"
    },
     {
        id: uuidv4(),
        username: "mansi",
        content: "she is upcoming summer analyst at goldman sachs"
    },
    {
        id: uuidv4(),
        username: "ritwik",
        content: "he thinks parul is irresponsible"
    },

];

app.listen(port, ()=>{
    console.log("listening to port 8080");
});

app.get("/posts" ,(req, res)=>
{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>
{
    let {username , content}= req.body;
    let id = uuidv4();
    posts.push({id ,username, content});

    console.log(req.body);
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>
{
    let {id}= req.params;
    let post =posts.find((p)=>id===p.id);
    console.log(post);
    console.log(id);
    res.render("show.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let newcontent = req.body.content;
    let post =posts.find((p)=>id===p.id);
    post.content = newcontent;
    console.log(post);
    res.send("patch working");
});
