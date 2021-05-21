"use strict";
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      notebook_id: { type: DataTypes.INTEGER, allowNull: true },
    },
    {}
  );
  Note.associate = function (models) {
    // associations can be defined here
    Note.hasMany(models.Tag_Note, { foreignKey: "note_id" });
    Note.belongsTo(models.User, { foreignKey: "user_id" });
    Note.belongsTo(models.Notebook, { foreignKey: "notebook_id" });
  };
  return Note;
};
