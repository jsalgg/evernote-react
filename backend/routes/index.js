// backend/routes/index.js
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
router.use("/api", apiRouter);

router.get("/hello/world", function (req, res) {
  console.log(req);
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("Hello World!");
});

module.exports = router;
