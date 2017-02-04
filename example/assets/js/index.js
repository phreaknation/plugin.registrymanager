/* global console */
/* global _ */
/* global Phaser */

(function() {
  'use strict';
  window.MyGame = {
    states: {}
  };
  var game;

  window.adjust = function adjust() {
    game.scale.setGameSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("optimizedResize", function() {
    window.adjust();
  });

  var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle("resize", "optimizedResize");

  window.onload = function() {
    // var cp = Phaser.Tile.prototype.containsPoint;
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

    window.game = game;

    game.state.add('Base', window.MyGame.states.Base);

    game.state.start('Base');
  };

})();
