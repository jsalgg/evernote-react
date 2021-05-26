const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Note } = require("../../db/models");

const router = express.Router();
//new note
router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const { user_id, title, body, notebook_id } = req.body;
    const note = await Note.create({
      user_id,
      title,
      body,
      notebook_id,
    });

    return res.json({ note });
  })
);
//get all notes
router.get(
  `/:notebook_id/get`,
  restoreUser,
  asyncHandler(async (req, res) => {
    const notes = await Note.findAll({
      where: { notebook_id: req.params.notebook_id },
    });

    return res.json(notes);
  })
);

module.exports = router;
