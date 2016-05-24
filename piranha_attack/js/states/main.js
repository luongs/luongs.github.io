var game = game;

var DIMENSIONS = {
  HEIGHT: 600,
  WIDTH: 750
};

var MAIN = {
  P_IMG : 'player',
  LAND_IMG : 'platform',
  ENEMY_IMG: 'enemy',
  BIRD_IMG: 'bird',
  BG_COLOR: '#ccddff',
  ENEMY_X: 0,
  ENEMY_Y: DIMENSIONS.HEIGHT-285,
  ENEMY_VELOCITY: 180,
  BIRD_X: 0,
  BIRD_Y: DIMENSIONS.HEIGHT-450,
  BIRD_GRAVITY: 0,
  BIRD_VELOCITY: 100,
  BIRD_SPAWN_CTR: 500,
  TEXT_STYLE:  {font: '50px Arial', fill: '#ffffff'},
  STARTLAND_X: -90,
  STARTLAND_Y: DIMENSIONS.HEIGHT-250,
  STOPLAND_X: 300,
  STOPLAND_Y: DIMENSIONS.HEIGHT-50,
  ENDLAND_X: DIMENSIONS.WIDTH-300,
  ENDLAND_Y: DIMENSIONS.HEIGHT-250
};

MAIN.createHelper = {

  addMouse: function(){
    return game.input.activePointer;
  },

  createLand: function(platforms){
    var item = null;
    var startLand = new Structure(MAIN.STARTLAND_X, MAIN.STARTLAND_Y,
                                  MAIN.LAND_IMG, platforms);

    item = startLand.createStructure();
    startLand.changeScale(item, 1 , 8);

    var stopPoint = new Structure(MAIN.STOPLAND_X, MAIN.STOPLAND_Y,
                                  MAIN.LAND_IMG, platforms);
    item = stopPoint.createStructure();
    stopPoint.changeScale(item,1,2);

    var endLand = new Structure(MAIN.ENDLAND_X, MAIN.ENDLAND_Y,
                            MAIN.LAND_IMG, platforms);
    item = endLand.createStructure();
    endLand.changeScale(item, 1, 8);
  },

  // TODO: Slow rate when player under water
  createPlayer: function(){
    var player = new Player(game.world.width/2, game.world.height-200,
                            MAIN.P_IMG);
    player = player.setupPlayer();
    return player;
  },

  createEnemy: function(){
    var item = null;
    var enemy = new Enemy(MAIN.ENEMY_X, MAIN.ENEMY_Y, MAIN.ENEMY_IMG);
    item = enemy.setupEnemy();
    enemy.setXVelocity(item, MAIN.ENEMY_VELOCITY);
    return item;
  },

  createBird: function(){
    var item = null;
    var enemy = new Enemy(MAIN.BIRD_X, MAIN.BIRD_Y, MAIN.BIRD_IMG);
    item = enemy.setupEnemy();
    enemy.setXVelocity(item, MAIN.BIRD_VELOCITY);
    enemy.setGravity(item, MAIN.BIRD_GRAVITY);
    return item;
  },

  // Definitely a hack to update the enemy global instance
  // and also change the respawn value
  // TODO: figure out how to get return parameters from a callback
  // function
  // TODO: figure out what to do with global respawn variable
  createTimerEnemy: function(){
    MAIN.enemy = MAIN.createHelper.createEnemy();
    MAIN.respawn = false;
  },

  // TODO: figure out how to return bird instead of changing
  // global variable here
  createTimerBird: function(){
    MAIN.bird = MAIN.createHelper.createBird();
  },

  createPointsText: function(points){
    var style = MAIN.TEXT_STYLE;
    var pointsText = game.add.text(game.world.width/2, 18, points, style);
    pointsText.text = points;
    return pointsText;
  },

  savePoints: function(points){
    if (game.device.localStorage){
      localStorage.score = points;
      localStorage.newHighScore = false;


      if (localStorage.highScore){

        if (parseInt(points) > parseInt(localStorage.highScore)){
          localStorage.highScore = points;
          localStorage.newHighScore = true;
        }
      }
      else {
        localStorage.highScore = localStorage.score;
      }
    }
  },

  endGame: function(){
    game.state.start('gameover');
  }
};

MAIN.ENEMY_MIN_T = 500;
MAIN.ENEMY_MAX_T= 2000;
MAIN.ENEMY_Y_GRAVITY = -250;
MAIN.Y_GRAVITY= -450;
MAIN.ADDED_GRAVITY = 5;

MAIN.updateHelper = {
  detectSurface: function(player, enemy, platforms){
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemy, platforms);
  },

  detectEnemy: function(player, enemy){
    return game.physics.arcade.overlap(player,enemy);
  },

  detectBird: function(player, bird){
    return game.physics.arcade.overlap(player,bird);
  },

  enemyIsOutOfBounds: function(enemy){
    return enemy.inWorld === false;
  },

  destroyEnemy: function(enemy){
    enemy.body = null;
    enemy.destroy();
  },

  destroyBird: function(bird){
    bird.body = null;
    bird.destroy();
  },



  spawnEnemy: function(){
    // Spawn enemy at random time between .5 and 2 seconds
    var randTime = Math.random() *(MAIN.ENEMY_MAX_T-MAIN.ENEMY_MIN_T)+
                  MAIN.ENEMY_MIN_T;
    window.setTimeout(MAIN.createHelper.createTimerEnemy, randTime);
  },

  incrementCtrAndSpawnBird: function(counter){
    if (counter === MAIN.BIRD_SPAWN_CTR){
      var randTime = Math.random() *(MAIN.ENEMY_MAX_T-MAIN.ENEMY_MIN_T)+
                     MAIN.ENEMY_MIN_T;
      window.setTimeout(MAIN.createHelper.createTimerBird, randTime);
      counter = 0;
      return counter;
    }
    else{
      return counter+1;
    }
  },

  getRandomNum: function(min, max){
    return Math.floor(Math.random()* (max-min+1)) + min;
  },

  enemyJump: function(enemy){
    if (enemy.alive){
      enemy.body.velocity.x = MAIN.ENEMY_VELOCITY;
    }
    // Makes enemy jump between 1 and 3 jumps
    var maxChk = MAIN.updateHelper.getRandomNum(350, 485);
    if (enemy.x > 300 && enemy.x < maxChk && enemy.alive &&
        (enemy.body.velocity.y <= 0 && enemy.body.velocity.y > -0.1)){
      enemy.body.velocity.y = MAIN.ENEMY_Y_GRAVITY;
    }
  },

  enemyStopAndJump: function(enemy){
    if (enemy.x > 295 && enemy.x < 300){
      enemy.body.velocity.x = 0;
      var randTime = Math.random() *(MAIN.ENEMY_MAX_T-MAIN.ENEMY_MIN_T)+
                    MAIN.ENEMY_MIN_T;
      window.setTimeout(this.enemyJump, randTime, enemy);
    }
  },

  updatePoints: function(points, pointsText){
    pointsText.text = points;
  },

  jump: function(player, mouse){
    // Jump when sprite is stationary or at the apex of a jump
    if ( mouse.isDown &&
        (player.body.velocity.y <= 0 && player.body.velocity.y > -30)){
      if (player.alive === false){
        return;
      }
      player.body.velocity.y = MAIN.Y_GRAVITY;

    }
  },

  flipAtTop: function(player){
    if (player.body.velocity.y <=0){
      player.scale.y = 1;
    }
    else {
      player.scale.y = -1;
    }
  },

  checkUnderwater: function(player){
    return (player.y >= game.height - 180 && player.y < game.height - 25);
  },

  checkAboveWater: function(player){
    return (player.y >= game.height - 380);
  },

  checkStationary: function(player){
    return (player.body.velocity.y === 0);
  },

  changeGravity: function(player, increment){
    return MAIN.player.body.velocity.y += increment;
  }
};

MAIN.UNDERWATER_Y = 5;
MAIN.ABOVEWATER_Y = 3;

var mainState = {
  create:function() {
    MAIN.mouse = MAIN.createHelper.addMouse();
    LOAD.preloadHelper.loadBackground(MAIN.BG_COLOR);
    MAIN.platforms = LEVEL.createGroup();
    MAIN.createHelper.createLand(MAIN.platforms);
    MAIN.player = MAIN.createHelper.createPlayer();
    MAIN.enemy = MAIN.createHelper.createEnemy();
    MAIN.bird = MAIN.createHelper.createBird();
    MAIN.respawn = false; // check if enemy should be respawned
    MAIN.birdSpawnCtr = 0;  // prevent constant spawning of birds
    MAIN.points = 0;
    MAIN.pointsText = MAIN.createHelper.createPointsText(MAIN.points);
  },

  update:function() {
    MAIN.updateHelper.detectSurface(MAIN.player, MAIN.enemy, MAIN.platforms);
    MAIN.updateHelper.enemyStopAndJump(MAIN.enemy);

    if (MAIN.updateHelper.detectEnemy(MAIN.player, MAIN.enemy)){
      MAIN.updateHelper.destroyEnemy(MAIN.enemy);
      MAIN.updateHelper.spawnEnemy();
      MAIN.respawn = true;
      MAIN.points += 1;
      MAIN.updateHelper.updatePoints(MAIN.points, MAIN.pointsText);
    }

    MAIN.birdSpawnCtr = MAIN.updateHelper.incrementCtrAndSpawnBird(
                                               MAIN.birdSpawnCtr);
    if (MAIN.updateHelper.detectBird(MAIN.player, MAIN.bird)){
      MAIN.updateHelper.destroyBird(MAIN.bird);
      MAIN.points += 3;
      MAIN.updateHelper.updatePoints(MAIN.points, MAIN.pointsText);
    }

    if (MAIN.updateHelper.checkUnderwater(MAIN.player) &&
        !MAIN.updateHelper.checkStationary(MAIN.player)){
     MAIN.player.body.velocity.y = MAIN.updateHelper.changeGravity(MAIN.player,
                                                            MAIN.UNDERWATER_Y);
    }
    else if (MAIN.updateHelper.checkAboveWater(MAIN.player)
              && !MAIN.updateHelper.checkStationary(MAIN.player)){
      MAIN.player.body.velocity.y = MAIN.updateHelper.changeGravity(MAIN.player,
                                                              MAIN.ABOVEWATER_Y);
    }

    // respawn is set to false after initial call or after a new
    // enemy is spawned
    if (MAIN.respawn === false &&
        MAIN.updateHelper.enemyIsOutOfBounds(MAIN.enemy)){
      MAIN.createHelper.savePoints(MAIN.points);
      MAIN.createHelper.endGame();
    }

    MAIN.updateHelper.flipAtTop(MAIN.player);
    MAIN.updateHelper.jump(MAIN.player, MAIN.mouse);
  }
};
