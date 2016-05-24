// object for player creation
var PLAYER = {
  ANCHOR: 0.5,
  Y_GRAVITY: 400
};

// game is a global variable set in game.js
var game = game;

var Player = function(x,y,img){
  this.x = x;
  this.y = y;
  this.img = img;
};

Player.prototype.setupPlayer = function(){
  var player = this.createSprite();
  this.startAnimation(player);
  this.enablePhysics(player);
  this.setAnchor(player);
  return player;
};

Player.prototype.createSprite = function(){
  return game.add.sprite(this.x, this.y, this.img);
};

PLAYER.ANIM_NAME = 'move';
PLAYER.ANIM_FRAMERATE = 3;
PLAYER.ANIM_LOOP = true;

Player.prototype.startAnimation = function(player){
  var walk = player.animations.add(PLAYER.ANIM_NAME);
  player.animations.play(PLAYER.ANIM_NAME, PLAYER.ANIM_FRAMERATE,
                         PLAYER.ANIM_LOOP);
}

Player.prototype.enablePhysics = function(player){
  game.physics.arcade.enable(player);
  player.body.gravity.y = PLAYER.Y_GRAVITY;
};

Player.prototype.setAnchor = function(player){
  player.anchor.setTo(PLAYER.ANCHOR, PLAYER.ANCHOR);
};
