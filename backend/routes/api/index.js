// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const notebookRouter = require("./notebook.js");
const noteRouter = require("./note.js");
router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/notebook", notebookRouter);
router.use("/note", noteRouter);

// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
