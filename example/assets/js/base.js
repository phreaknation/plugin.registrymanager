/* global console */
/* global _ */
/* global ajv */
/* global Phaser */
/* global PhreakNation */
var inspector;
var manReg;
(function() {
    'use strict';

    var state = function state(game) {};

    state.prototype = {
        preload: function () {
            this.game.scale.setResizeCallback(function() {
              window.adjust();
            });

            this.game.input.maxPointers = 1;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.refresh();
        },

        create: function () {
            // inspector = this.game.plugins.add(Phaser.Plugin.Inspector);

            console.log('Loading Registry Manager...');
            manReg = this.game.plugins.add(PhreakNation.Plugins.RegistryManager);
            var regTypes = manReg.getRegistryTypes();
            if (regTypes.indexOf('LOCALSTORAGE') !== -1) {
                manReg.setRegistry(regTypes.LOCALSTORAGE);
                manReg.load('My Game');

                if (_.isEmpty(manReg.get())) {
                    manReg.set('test', {
                        this: {
                            is: {
                                a: 'test',
                            },
                        },
                    });

                    manReg.save();
                }
                manReg.set('a', {});
                manReg.set('a.b', {});
                manReg.set('a.b.c', 'd');

                manReg.save();

                console.log(manReg.get('a'));
                manReg.remove('a.b.c');

                console.log(manReg.get());
            }

            this.game.stage.backgroundColor = 0x444444;
            this.game.stage.backgroundColor = '#004a80';
            this.cursors = this.input.keyboard.createCursorKeys();
            this.game.input.mouse.capture = true;
        },

        update: function () {

        },

        render: function () {

        },
    };

    window.MyGame.states.Base = state;
})();
