var GAME = {
  screen_width: 750,
  screen_height: 600
};

var game = new Phaser.Game(GAME.screen_width, GAME.screen_height,
                           Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('main', mainState);
game.state.add('gameover', gameoverState);

game.state.start('boot');
