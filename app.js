const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const aboutContent = "this is about";
const posts = [];


const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public")); 

app.get("/", function (request, response) {
  response.render("home", {
    posts: posts,
  });
});

app.get("/about", function (request, response) {
  response.render("about", {
    about: aboutContent,
  });
});

app.get("/see", function (request, response) {
  response.render("see", {
    posts: posts,
  });
});

app.get("/posts/:topic", function (request, response) {
  let found = false;
  posts.forEach((item) => {
    if (_.lowerCase(request.params.topic) === _.lowerCase(item.Title)) {
      response.render("post.ejs", {
        Title: item.Title,
        Content: item.Content,
      
      });
      found = true;
    }
  });
  if (!found) {
    response.redirect("/");
  }
});

app.get("/compose", function (request, response) {
  response.render("compose");
});

app.post("/compose", function (request, response) {
  const postTitle = request.body.postTitle;
  const postContent = request.body.postContent;

  if (!postTitle || !postContent) {
    return response.send(
      "<script>alert('Please fill in both the title and content fields.'); window.location.href='/compose';</script>"
    );
  }

  const post = {
    Title: postTitle,
    Content: postContent,
    
  };

  posts.push(post);
  response.redirect("/");
});

app.post("/delete", function (request, response) {
  const postToDelete = request.body.postTitle;

  posts.forEach((post, index) => {
    if (_.lowerCase(post.Title) === _.lowerCase(postToDelete)) {
      posts.splice(index, 1);
    }
  });

  response.redirect("/");
});


app.listen(3001, function () {
  console.log("Server started on port 3001");
});



