const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Notebook } = require("../../db/models");

const router = express.Router();
//new notebook
router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const { user_id, name, color } = req.body;
    const notebook = await Notebook.create({ user_id, name, color });

    return res.json({ notebook });
  })
);
//get notebook
router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const notebooks = await Notebook.findAll({ where: { user_id: user.id } });

    return res.json(notebooks);
  })
);
module.exports = router;
