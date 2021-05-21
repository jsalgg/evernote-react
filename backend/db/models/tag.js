"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      tag_name: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  Tag.associate = function (models) {
    // associations can be defined here
    Tag.belongsTo(models.Tag_Notebook, { foreignKey: "tag_id" });
    Tag.belongsTo(models.Tag_Note, { foreignKey: "tag_id" });
  };
  return Tag;
};
