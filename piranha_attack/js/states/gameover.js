var GAMEOVER = {
  SCORE_MSG: "Your score: ",
  NEW_HIGHSCORE: " - New High Score!",
  HIGHSCORE_MSG: "Highest score: ",
  MAINMENU_MSG: "Tap to return to main menu",
  BG_COLOR: '#2ecc71',
  TEXT_FONT: {font: '25px Arial', fill: "#ffffff"},
  X: 80,
  SCORE_Y: 80,
  HIGHSCORE_Y: 120,
  INSTR_Y: 170
};

var game = game;

GAMEOVER.helper = {

  getScore: function(){
    var score = 0;

    if (game.device.localStorage){
      score = localStorage.score;
    }

    return score;
  },

  getHighScore: function(){
    var highScore = 0;

    if (game.device.localStorage){
      highScore = localStorage.highScore;
    }

    return highScore;
  },

  getNewHighScore: function() {
    var isNewHighScore = false;
    if (game.device.localStorage){
      isNewHighScore = localStorage.newHighScore;
    }

    return isNewHighScore;
  },

  displayMsg: function(score, highScore, isNewHighScore){
    if (isNewHighScore === 'true'){
      game.add.text(GAMEOVER.X, GAMEOVER.SCORE_Y,
          (GAMEOVER.SCORE_MSG.concat(score)).concat(GAMEOVER.NEW_HIGHSCORE),
          GAMEOVER.TEXT_FONT);
    }
    game.add.text(GAMEOVER.X, GAMEOVER.SCORE_Y,
                  GAMEOVER.SCORE_MSG.concat(score),
                  GAMEOVER.TEXT_FONT);
    game.add.text(GAMEOVER.X, GAMEOVER.HIGHSCORE_Y,
                  GAMEOVER.HIGHSCORE_MSG.concat(highScore),
                  GAMEOVER.TEXT_FONT);
    game.add.text(GAMEOVER.X, GAMEOVER.INSTR_Y,
                  GAMEOVER.MAINMENU_MSG, GAMEOVER.TEXT_FONT);
  },

  getClick: function(){
    return game.input.activePointer.isDown;
  },

  goToMainMenu: function(clicked) {
    if (clicked){
      game.state.start('menu');
    }
  }
};

var gameoverState = {
  create: function() {
    var score = GAMEOVER.helper.getScore();
    var highScore = GAMEOVER.helper.getHighScore();
    var isNewHighScore = GAMEOVER.helper.getNewHighScore();
    LOAD.preloadHelper.loadBackground(GAMEOVER.BG_COLOR);
    GAMEOVER.helper.displayMsg(score, highScore, isNewHighScore);
  },

  update: function() {
    var clicked = GAMEOVER.helper.getClick();
    GAMEOVER.helper.goToMainMenu(clicked);
  }
};
