'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorite = sequelize.define('favorite', {
    label: DataTypes.STRING,
    ingredients: DataTypes.ARRAY(DataTypes.STRING),
    imgUrl: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
  };
  return favorite;
};