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

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const { title, color } = req.body;
    const { user } = req;
    console.log(user);
    const notebook = await Notebook.create({ title });

    return res.json({
      user,
    });
  })
);

module.exports = router;
