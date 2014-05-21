// CMMI Game Level 1

game.Level1 = { 
    scores: {},

    Game: me.ScreenObject.extend({
        init: function() {
            for (i=0; i<game.ItemL1Types.length; i++)
                //window.alert(game.ItemL1Types[i]);
                game.Level1.scores[game.ItemL1Types[i]] = 0;
        },
        
        onResetEvent: function() {
            console.log("Resetting level 1.");
    
            me.input.bindKey(me.input.KEY.LEFT, "left");
            me.input.bindKey(me.input.KEY.RIGHT, "right");
            me.input.bindKey(me.input.KEY.SPACE, "space");
            this.score = 0;
            
            // Set background
            me.game.world.addChild(new BackgroundLayer('background_l1', -1));

            this.ground = new GroundL1Entity(0, me.game.viewport.height - 96);
            me.game.world.addChild(this.ground, 10);
 
            // HUD to display points
            this.HUD = new game.HUDL1.Container();
            me.game.world.addChild(this.HUD);

            this.player = me.entityPool.newInstanceOf("player_l1", 20, 40);
            me.game.world.addChild(this.player, 11);
    
            this.getReady = new me.SpriteObject(
                me.game.viewport.width/2 - 200,
                me.video.getHeight()/2 - 100,
                me.loader.getImage('getready')
            );
            me.game.world.addChild(this.getReady, 10);
    
            var fadeOut = new me.Tween(this.getReady).to({alpha: 0}, 2000)
                .easing(me.Tween.Easing.Linear.None)
                .onComplete(function(){
                    game.data.start = true;
                    me.game.world.addChild(new ItemGenerator(), 0);
                }).start();
        },
    
        onDestroyEvent: function() {
            this.player = null;
            me.game.world.removeChild(this.HUD);
        }
    }),
};

