const router = require("express").Router();
const middleware = require("../util/middleware");
const { Blog, User, UserBlogs } = require("../models");

const tokenExtractor = middleware.tokenExtractor;

router.post("/", async (req, res, next) => {
  try {
    blog = await Blog.findByPk(req.body.blogId);
    user = await User.findByPk(req.body.userId);
    if (blog && user) {
      UserBlogs.create({ ...req.body });
      res.status(201).json(req.body);
    } else {
      res.sendStatus(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    reading = await UserBlogs.findByPk(req.params.id);
    if (reading && reading.userId === req.decodedToken.id) {
      reading.read = req.body.read
      await reading.save()
      res.json(reading);
    } else {
      res.sendStatus(401).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
