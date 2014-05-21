// CMMI Game Level 1

game.Level2 = { 
    scores: {},

    Game: me.ScreenObject.extend({
        init: function() {
        },
        
        onResetEvent: function() {
            console.log("Resetting level 2.");
    
            me.input.bindKey(me.input.KEY.LEFT, "left");
            me.input.bindKey(me.input.KEY.RIGHT, "right");
            me.input.bindKey(me.input.KEY.UP, "up");
            me.input.bindKey(me.input.KEY.DOWN, "down");
 
            me.levelDirector.loadLevel("level_2");           

            // HUD to display points
            //this.HUD = new game.HUDL1.Container();
            //me.game.world.addChild(this.HUD);

            //this.player = me.entityPool.newInstanceOf("player_l2", 20, 40);
            //me.game.world.addChild(this.player, 11);
    
        },
    
        onDestroyEvent: function() {
            me.game.world.removeChild(this.HUD);
        }
    }),
};

