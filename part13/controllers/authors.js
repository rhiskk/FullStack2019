const router = require("express").Router();
const { Op } = require("sequelize");
const { Blog } = require("../models");
const { sequelize } = require("../models/blog");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: sequelize.literal('likes DESC'),
  });
  res.json(authors);
});
module.exports = router;
