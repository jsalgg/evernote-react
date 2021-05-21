"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define(
    "Notebook",
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      color: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  Notebook.associate = function (models) {
    // associations can be defined here
    Notebook.hasMany(models.Note, { foreignKey: "notebook_id" });
    Notebook.hasMany(models.Tag_Notebook, { foreignKey: "notebook_id" });
    Notebook.belongsTo(models.User, { foreignKey: "user_id" });
  };
  return Notebook;
};
