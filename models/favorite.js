'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorite = sequelize.define('favorite', {
    label: DataTypes.STRING,
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    imgUrl: DataTypes.STRING,
    url: DataTypes.STRING,
    uri: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
    models.favorite.belongsTo(models.user);
  };
  return favorite;
};