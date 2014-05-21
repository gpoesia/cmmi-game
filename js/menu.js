// Main menu, in which the player chooses the game level to start in.

LevelButton = me.GUI_Object.extend({
    init: function(x, y, text, font, state) {

        this.parent(x, y, {image: "button_background",
                           spritewidth: 180,
                           spriteheight: 60});
        this.x = x;
        this.y = y;
        this.z = 4;
        this.state = state;
        this.font = font;
        this.text = text.toUpperCase();
    },

    onClick: function() {
        me.state.change(this.state);
        return false;
    },

    draw: function(context) {
        this.parent(context);
        this.font.draw(context, this.text, this.x + 90, this.y + 10);
    },

    update: function() {
        return this.parent();
    }
});

game.MainMenu = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
    },

    onResetEvent: function() {
        this.screenCleared = false;

        this.font = new me.Font("Sans", "25px", "white", "center");
        this.titleFont = new me.Font("Verdana", "35px", "blue", "left");

        this.buttons = [
            new LevelButton(350, 150, "Level 1", this.font, game.states.STATE_LEVEL_1),
            new LevelButton(350, 200, "Level 2", this.font, game.states.STATE_LEVEL_2),
            new LevelButton(350, 250, "Level 3", this.font, game.states.STATE_LEVEL_3_0_INIT),
            new LevelButton(350, 300, "Level 4.1", this.font, game.states.STATE_LEVEL_4_1),
            new LevelButton(350, 350, "Level 4.2", this.font, game.states.STATE_LEVEL_4_2),
            new LevelButton(350, 400, "Level 5.1", this.font, game.states.STATE_LEVEL_5_1),
            new LevelButton(350, 450, "Level 5.2", this.font, game.states.STATE_LEVEL_5_2),
        ];

        for (var i = 0; i < this.buttons.length; i++) {
            me.game.world.addChild(this.buttons[i]);
        }
    },

    onDestroyEvent: function() {
        for (var i = 0; i < this.buttons.length; i++) {
            me.game.world.removeChild(this.buttons[i]);
        }
    },

    update: function() {
        return true;
    },

    draw: function(context) {
        this.titleFont.draw(context, "Escolha o nivel do jogo", 100, 50);
        if (!this.screenCleared) {
            this.screenCleared = true;
            me.video.clearSurface(context, "white");
        }
    }
});

