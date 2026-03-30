const express = require("express"); //=>express a framwork to build web server with node.js
const app = express(); // app: express application
const port = 8080; 

const path = require("path"); //=> helps manage file paths
const { v4: uuidv4 } = require("uuid"); //=> uuidv4 generate a unique ID for each post

const methodOverride = require("method-override");  // => method-override => lets use HTTP verbs like PATCH and DELETE in forms (HTML forms only supports GET and POST.)

// uuid4(); => '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

app.use(express.urlencoded({extended: true})); // => Paras data sent from forms(so you can use req.body.)
app.use(methodOverride("_method")); // => Checks for a hidden input named _method to override the HTTP method.

app.set("view engine", "ejs"); // =>EJS :template engine to write HTML + JS together.

app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts = [
    {
        id: uuidv4(), 
        username : "apnacollege",
        content : "I love coding",
    },
    {
        id: uuidv4(),
        username : "khushbooVerma",
        content : "Hard work is important to achieve success",
    },
    {
        id: uuidv4(),
        username : "AbhishekYadav",
        content : "I got selected for my 1st internship",
    },
]; 
 
app.get("/", (req, res) => {
    res.send("serving working well!");
}); 


// res.send() : used to send various types of data as a response to the client (it can send string, objects , arrays or buffers)
// res.render() : used to render a view template and send the resulting HTML to the client.(it takes the name of the template file and optional object containing data to be passed to the template)
//res.redirect() : used to redirect the client's browser to a different URL . it sends  an HTTP redirect status code and the new URL in the location header(it takes the URL to which the client should be redirected)


// res.redirect(): ek bar jo koi request beja gaya hota hai. use kbhi khi aur bhejna hota hai to redirect ka use karte hai.

//show all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts}); //=> GET/posts :Render a page showing all posts using index.js
});


//new post form
app.get("/posts/new", (req, res) => {  //=> GET/posts/new : shows a form to create a new post
    res.render("new.ejs");
});  

// create post
app.post("/posts", (req, res) => {
   let { username, content} = req.body; 
   let id=uuidv4(); // generate unique id for each post
   posts.push({id, username, content});  
   // res.send("post requests working");
   res.redirect("/posts");    // POST/posts: adds new post data from form into the posts array
});                         // Then redirects back to /posts to show updated list.

// edit post = always above :id 
app.get("/posts/:id/edit", (req, res) => {  // GET/posts/:id/edit: shows a from to edit an existing post.
   const { id } = req.params;
    const post = posts.find((p) => p.id === id);  
    res.render("edit.ejs", {post}); 
});  

// show single post
app.get("/posts/:id", (req, res) => { // => GET/posts/:id: Displays a single post(based on its id)
    const {id} = req.params;
   // console.log(id);
   const post = posts.find((p) =>  p.id === id );
   //console.log(post);
   res.render("show.ejs", {post});  
  // res.render("/posts");
   // res.send("request working"); -> 
});  


//update post
app.patch("/posts/:id", (req, res)=> { // patch/posts/:id : updates the content of specific post. After editing , redirect to the list of posts.
    let { id } = req.params;
    let newContent = req.body.content;
   // console.log(newContent);
    let post = posts.find((p) =>  p.id === id);
    post.content = newContent;
   // console.log(post); 
    //res.send("patch request working");
    res.redirect("/posts"); 
}); 



// delete post
app.delete("/posts/:id",(req, res) => { //delete/posts/:id: Remove the post from the array using its ID.
    let { id } = req.params;
     posts = posts.filter((p) => id !== p.id);
    //res.send("delete success");
     res.redirect("/posts");
} ); 

app.listen(port, () => {
    console.log("listening to port : 8080");

});
















