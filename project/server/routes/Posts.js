const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

// Endpoint for fetching all posts
router.get("/", async (req, res) => {
  const { page, limit } = req.query;

  // If both page and limit parameters are provided, fetch posts with pagination
  if (page && limit) {
    const offset = (parseInt(page) - 1) * parseInt(limit);
    try {
      const listOfPosts = await Posts.findAll({
        offset: offset,
        limit: parseInt(limit),
      });
      // console.log(listOfPosts);
      res.json(listOfPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // If page and limit parameters are not provided, fetch all posts
    try {
      const allPosts = await Posts.findAll();
      res.json(allPosts);
    } catch (error) {
      console.error("Error fetching all posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Posts.findByPk(id);
    res.json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const createdPost = await Posts.create(post);
    res.json(createdPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
