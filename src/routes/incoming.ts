import express = require("express");
const router = express.Router();

/* POST */
router.post("/github", (req, res, next) => {
  res.send(req.body);
});

export default router;
