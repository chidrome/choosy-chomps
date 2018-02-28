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
    uri: DataTypes.STRING
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
  };
  return favorite;
};