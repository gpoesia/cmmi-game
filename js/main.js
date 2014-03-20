var game = {

    // Global data, shared between levels
    data : { },

    onload: function() {
        if (!me.video.init("screen", 800, 600, true, 'auto')) {
            alert("Your browser isn't supported - try updating it to its latest version.");
            return;
        }

        // If the URL ends with "#debug", enable the MelonJS debug panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }

        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.resources);
        me.state.change(me.state.LOADING);
    },

    loaded: function() {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.change(me.state.MENU);
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
    }
];
