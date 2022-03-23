const router = require("express").Router();
const Session = require("../models/session");

router.delete("/", async (req, res) => {
  try{
    const session = await Session.findByPk(req.session.id);
    await session.destroy();
    req.session.destroy();
    res.status(204).end();
  } catch (err) {
      console.log(err);
  }
});

module.exports = router;
