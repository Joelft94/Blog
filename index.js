import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Array to handle the posts
var posts = [];


// Generates a UUID
function generateUniqueId() {
    return uuidv4();
}


// Send the posts array
app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.post("/", (req, res) => {
        const newPost = {
            id: generateUniqueId(),
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
        };
        posts.push(newPost);
    res.redirect("/");
});

// Edit the post
app.get("/edit/:postId", (req, res) => {
    //get the postId with .params that grabs what is after the : in the url
    const postId = req.params.postId;
    var postToEdit = posts.find(post => post.id === postId );
    res.render("edit.ejs" , {post : postToEdit});

});

// Update the post
app.post("/update/:postId", (req,res) => {
    // Find the post Index with the correct id
    const postId = req.params.postId;
    const postIndex = posts.findIndex(post => post.id === postId);

    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;

    res.redirect("/");

})

//Delete the post
app.get("/delete/:postId", (req, res) => {

    const postId = req.params.postId;


//2 methods of deleting one is filtering and the other with splice


   /*  const updatedPosts = posts.filter(post => post.id !== postId);
    posts = updatedPosts; */

    const postToDelete = posts.find(post => post.id === postId );
    const index = posts.indexOf(postToDelete);
    posts.splice(index, 1);


    res.redirect("/");
})















app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});