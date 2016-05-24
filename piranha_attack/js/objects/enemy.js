// object for player creation
var ENEMY = {
  ANCHOR: 0.5,
  Y_GRAVITY: 500
};

// game is a global variable set in game.js
var game = game;

var Enemy = function(x,y,img){
  this.x = x;
  this.y = y;
  this.img = img;
};

Enemy.prototype.setupEnemy = function(){
  var enemy = this.createSprite();
  this.moveAnimation(enemy);
  this.enablePhysics(enemy);
  this.setAnchor(enemy);
  enemy.checkWorldBounds = true;
  enemy.outOfBoundsKill = true;
  return enemy;
};

Enemy.prototype.createSprite = function(){
  return game.add.sprite(this.x, this.y, this.img);
};

ENEMY.ANIM_MOVE = 'move';
ENEMY.MOVE_FRAMES = [0,1,2];
ENEMY.ANIM_FRAMERATE = 2;
ENEMY.ANIM_LOOP = true;

Enemy.prototype.moveAnimation = function(enemy){
  var walk = enemy.animations.add(ENEMY.ANIM_MOVE, ENEMY.MOVE_FRAMES);
  enemy.animations.play(ENEMY.ANIM_MOVE, ENEMY.ANIM_FRAMERATE,
                        ENEMY.ANIM_LOOP);
}

Enemy.prototype.enablePhysics = function(enemy){
  game.physics.arcade.enable(enemy);
  enemy.body.gravity.y = ENEMY.Y_GRAVITY;
};

Enemy.prototype.setAnchor = function(enemy){
  enemy.anchor.setTo(ENEMY.ANCHOR, ENEMY.ANCHOR);
};

Enemy.prototype.setXVelocity = function(enemy, velocity){
  enemy.body.velocity.x = velocity;
};

Enemy.prototype.setGravity = function(enemy, gravity){
  enemy.body.gravity.y = gravity;
};
