const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await Comments.findAll({ where: { postId } });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comment by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:postId/limited/:limit", async (req, res) => {
  const postId = req.params.postId;
  const limit = parseInt(req.params.limit);

  try {
    const comments = await Comments.findAll({
      where: { postId },
      limit: limit,
    });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching limited comments by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const comment = req.body;
  try {
    const createdComment = await Comments.create(comment);
    res.json(createdComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
