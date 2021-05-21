"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tag_Note = sequelize.define(
    "Tag_Note",
    {
      tag_id: { type: DataTypes.INTEGER, allowNull: false },
      note_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Tag_Note.associate = function (models) {
    // associations can be defined here
    Tag_Note.belongsTo(models.Note, { foreignKey: "note_id" });
    Tag_Note.hasMany(models.Tag, { foreignKey: "tag_id" });
  };
  return Tag_Note;
};
