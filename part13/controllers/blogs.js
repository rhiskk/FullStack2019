const router = require("express").Router();
const { sessionChecker } = require("../util/middleware");
const { Op } = require("sequelize");
const { Blog, User } = require("../models");

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

router.post("/", sessionChecker, async (req, res, next) => {
  try {
    if (!req.user.disabled) {
      const user = await User.findByPk(req.user.id);
      const blog = await Blog.create({ ...req.body, userId: user.id });
      res.status(201).json(blog);
    }
    res.status(401).end;
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", sessionChecker, blogFinder, async (req, res) => {
  if (!req.blog) {
    res.status(204).end();
  } else if (req.blog.userId === req.user.id) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    res.status(401).end();
  }
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
