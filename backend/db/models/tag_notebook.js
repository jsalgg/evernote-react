"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tag_Notebook = sequelize.define(
    "Tag_Notebook",
    {
      tag_id: { type: DataTypes.INTEGER, allowNull: false },
      notebook_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Tag_Notebook.associate = function (models) {
    // associations can be defined here
    Tag_Notebook.belongsTo(models.Notebook, { foreignKey: "notebook_id" });
    Tag_Notebook.hasMany(models.Tag, { foreignKey: "tag_id" });
  };
  return Tag_Notebook;
};
