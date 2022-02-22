const router = require("express").Router();
const middleware = require("../util/middleware");
const { Op } = require("sequelize");
const { Blog, User } = require("../models");

const tokenExtractor = middleware.tokenExtractor;

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where: {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search ? req.query.search : "",
          },
        },
        {
          author: {
            [Op.substring]: req.query.search ? req.query.search : "",
          },
        },
      ],
    },
    order: [["likes", "DESC"]],
  });

  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog?.userId === req.decodedToken.id) {
    await req.blog.destroy();
  }
  res.status(401).end();
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
