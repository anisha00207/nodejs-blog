const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";
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
    home: homeStartingContent,
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

app.get("/about", function (request, response) {
  response.render("about", {
    about: aboutContent,
  });
});

app.get("/contact", function (request, response) {
  response.render("contact", {
    contact: contactContent,
  });
});

app.get("/compose", function (request, response) {
  response.render("compose");
});

app.post("/compose", function (request, response) {
  const post = {
    Title: request.body.postTitle,
    Content: request.body.postContent,
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
