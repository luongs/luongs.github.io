// level includes walls and obstacles
var LEVEL = {
  
};

// game variable set in game.js
var game = game;

// groups are used by Phaser to aggregate common elements like obtacles
LEVEL.createGroup = function(){
  var platform = game.add.group();
  platform.enableBody = true;
  return platform;
};

var Structure = function(x, y, img, group){
  this.x = x;
  this.y = y;
  this.img = img;
  this.group = group;
};

Structure.prototype.createStructure = function(){
  var struct = this.group.create(this.x, this.y, this.img);
  struct.body.immovable = true;
  return struct;
};

Structure.prototype.changeScale = function(item, x_scale, y_scale){
  item.scale.setTo(x_scale, y_scale);
};
