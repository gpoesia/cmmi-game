var game = {

    // Global data, shared between levels
    data : {},

    onload: function() {
        if (!me.video.init("screen", 800, 600, true, 'auto')) {
            alert("Your browser isn't supported - try updating it to its latest version.");
            return;
        }

        // If the URL ends with "#debug", enable the MelonJS debug panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(this, this.debugPanel, "debug");
            });
        }

        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.resources);
        me.state.change(me.state.LOADING);
    },

    loaded: function() {
        me.state.set(me.state.READY, new game.TitleScreen());
        me.state.set(me.state.MENU, new game.MainMenu());
        
        // Level 1 entities
        me.entityPool.add("player_l1", game.PlayerL1Entity);
        me.entityPool.add("item_l1", game.ItemL1Entity);

        // LEvel 2 entities
        me.entityPool.add("player_l2", game.PlayerL2Entity);

        // level 3 entities
        me.entityPool.add("hero", game.HeroEntity);
        me.entityPool.add("girl", game.GirlEntity);

        me.state.set(game.states.STATE_LEVEL_1, new game.Level1.Game());
        me.state.set(game.states.STATE_LEVEL_2, new game.Level2.Game());
        me.state.set(game.states.STATE_LEVEL_3_0_INIT, new game.Level3.MiniGame0());
        me.state.set(game.states.STATE_LEVEL_3_1, new game.Level3.MiniGame1());
        me.state.set(game.states.STATE_LEVEL_4_1, new game.Level4.MiniGame1());
        me.state.set(game.states.STATE_LEVEL_4_2, new game.Level4.MiniGame2());
        me.state.set(game.states.STATE_LEVEL_5_1, new game.Level5.MiniGame1());

        me.state.change(me.state.READY);
    }
};

game.TitleScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);

        this.title = null;
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
        this.scroller = "Criando maturidade no desenvolvimento de software com o CMMI! Rumo ao nivel 5!".toUpperCase();
        this.scrollerpos = null;
    },

    onResetEvent: function() {
        if (this.title == null) {
            this.title = me.loader.getImage("cmmi_levels");
            this.font = new me.BitmapFont("32x32_font", 32);
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);

            me.input.bindKey(me.input.KEY.ENTER, "enter", true);

            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
                if (action === "enter") {
                    me.state.change(me.state.MENU);
                }
            });
        }

        this.scrollertween = new me.Tween(this);
        this.scrollover();
    },

    scrollover: function() {
        this.scrollerpos = 640;
        this.scrollertween = new me.Tween(this).to(
            {scrollerpos: -2000}, 10000).onComplete(this.scrollover.bind(this)).start();
    },

    update: function() {
        return true;
    },

    draw: function(context) {
        context.drawImage(this.title, 0, 0);
        this.font.draw(context, "CMMI Game".toUpperCase(), 250, 40);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
    },

    onDestroyEvent: function() {
    },
});

game.resources = [
    {
        name: "cmmi_levels",
        type: "image",
        src: "images/cmmi_levels.png"
    },

    {
        name: "32x32_font",
        type: "image",
        src: "images/32x32_font.png"
    },

    {
        name: "button_background",
        type: "image",
        src: "images/button.png"
    },

    {
        name: "getready",
        type: "image",
        src: "data/img/getready.png"
    },

    // Level 1 resources
    {
        name: "background_l1",
        type: "image",
        src: "data/img/background_l1.png"
    },

    {
        name: "ground_l1",
        type: "image",
        src: "data/img/ground_l1.png"
    },

    {
        name: "player_l1",
        type: "image",
        src: "data/img/player_l1.png"
    },

    {
        name: "item_l1_0",
        type: "image",
        src: "data/img/item_l1_0.png"
    },

    // Level 2 resources
    {
        name: "player_l2",
        type: "image",
        src: "data/img/player_L2.png"
    },

    {
        name: "metatiles32x32",
        type: "image",
        src: "data/map/tileset/metatiles32x32.png"
    },

    {
        name: "office_tileset",
        type: "image",
        src: "data/map/tileset/office_tileset.png"
    },

    {
        name: "characters_l2",
        type: "image",
        src: "data/map/tileset/characters_l2.png"
    },

    {
        name: "level_2",
        type: "tmx",
        src: "data/map/map_level_2.tmx"
    },

    // Level 3 resources
    {
        name: "girl", 
        type: "image", 
        src: "data/img/girl.png"
    },

    {
        name: "boy",
        type:"image",
        src: "data/img/boy.png"
    },

    {
        name: "TileA2",
        type:"image",
        src: "data/map/tileset/TileA2.png"
    },

    {
        name: "clock2_resizedbg",
        type: "image",
        src: "data/map/tileset/clock2_resizedbg.png"
    },

    /* Maps */
    {
        name: "town",
        type: "tmx",
        src: "data/map/town.tmx"
    },

    {
      name: "clock",
      type: "tmx",
      src: "data/map/clock.tmx"
    },
];
