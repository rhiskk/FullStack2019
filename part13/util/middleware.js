const logger = require("./logger");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const Session = require("../models/session");
const { User } = require("../models");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      res.status(401).json({ error: "token invalid" });
    }
  } else {
    res.status(401).json({ error: "token missing" });
  }
  next();
};

const sessionChecker = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      where: {
        sid: req.session.id,
      },
    });

    if (!session) {
      res.status(401).json({ error: "server side session not found" });
    }

    req.user = await User.findByPk(req.session.userId);
    if (req.user.disabled) {
      res.status(401).json({ error: "account disabled" });
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  sessionChecker,
};
