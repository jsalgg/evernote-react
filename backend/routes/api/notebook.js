const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Notebook, Note } = require("../../db/models");

const router = express.Router();
//new notebook
router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const { user_id, name, color } = req.body;
    const notebook = await Notebook.create({ user_id, name, color });

    return res.json(notebook);
  })
);
//get a notebopopk
router.get(
  "/:id",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const notebooks = await Notebook.findAll({ where: { id: req.params.id } });

    return res.json(notebooks);
  })
);

//get notebooks
router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const notebooks = await Notebook.findAll({ where: { user_id: user.id } });

    return res.json(notebooks);
  })
);

router.post(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const res1 = await Note.destroy({ where: { notebook_id: id } });
    const res2 = await Notebook.destroy({ where: { id: id } });

    return res.json(res1 + res2);
  })
);

router.post(
  "/:id/edit",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, color } = req.body;
    const notebook = await Notebook.update(
      { name: name, color: color },
      { where: { id } }
    );

    return res.json(notebook);
  })
);

module.exports = router;
