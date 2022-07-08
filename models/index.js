const User = require('./User');
const Shop = require('./Shop');
const Graphics = require('./Graphics');

Shop.hasMany(Graphics, {
  foreignKey: 'shop_id',
});

Graphics.belongsTo(Shop, {
  foreignKey: 'shop_id',
});

module.exports = { User, Shop, Graphics };