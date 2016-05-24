
var MENU = {
  title: 'Piranha Attack',
  startLabel: 'Tap to start game',
  instrLabel: 'Instructions',
  instr: 'Tap to jump \nHold for double jump ',
  headerFont: {font: '50px Arial', fill: '#ffffff'},
  textFont: {font: '25px Arial', fill: '#ffffff'}
};

var game = game;

MENU.menuHelper = {
  displayText: function(){
    game.add.text(80,80, MENU.title, MENU.headerFont);
    game.add.text(80, game.world.height-290, MENU.startLabel, MENU.textFont);
    game.add.text(80, game.world.height-210, MENU.instrLabel, MENU.textFont);
    game.add.text(80, game.world.height-170, MENU.instr, MENU.textFont);
  },

  getClick: function() {
    return game.input.activePointer.isDown;
  },

  startGame: function(clicked){
    if (clicked){
      game.state.start('main');
    }
  }
};

var menuState = {
  create: function() {
    MENU.menuHelper.displayText();
  },

  update: function(){
    var clicked = MENU.menuHelper.getClick();
    MENU.menuHelper.startGame(clicked);
  }
};
