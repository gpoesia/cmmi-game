game.BaseEntity = me.ObjectEntity.extend({
		
	/**
     * Set direction 
 	 * @private
 	 * @param {number} dx
 	 * @param {number} dy
     */
    _setDirection:function( dx, dy ){    	    	          	    	  
    	if( Math.abs( dx ) > Math.abs( dy ) ){    		
    		this.direction = ( dx > 0) ? "right" : "left";
    		     		    	   
    	}else{
    		this.direction = ( dy > 0) ? "down" : "up";    		   		
    	}     	    	   	   
    },  
    
    /**
     * Calculate step for every update 	
 	 * @private
     */
    _calculateStep: function(){
    	
    	if( this._target ){
    		    		    			    			    		    		 
    		var dx = this._target.x - this.pos.x;	
    		var dy = this._target.y - this.pos.y;
    		    		    	
    		if(Math.abs(dx) < this.maxVel.x 
        	&& Math.abs(dy) < this.maxVel.x){        		
        		delete this._target;
        		return;        		        		     
        	}
        	        	    	
    		var angle = Math.atan2(dy, dx);
        	this.vel.x = Math.cos(angle) * this.accel.x * me.timer.tick;
        	this.vel.y = Math.sin(angle) * this.accel.y * me.timer.tick;        	        	        	        	               	           	   
    	}else{
    		this.vel.x = 0;
    		this.vel.y = 0;
    	}   	
    }, 
    
     /**
	 * default on collision handler	
	 */ 
    onCollision : function (res, obj){    		   
    	delete this._target;    	  
    	this._setDirection( -res.x, -res.y );
    	this.renderable.setCurrentAnimation( this.direction );     	  	  		
    },  
    
    onDialogReset:function(){
    	delete this.isTalking;    	
    },   
    
    onDialogShow:function( event ){    	
    	if(event.sentence.isChoice){
    		return;	
    	}
    		    	
    	// create sound icon    	    
    	var icon = document.createElement( "i" );
    	icon.setAttribute( "class", "glyphicon glyphicon-volume-up");
    	icon.addEventListener( me.device.touch ? "touchstart" : "mousedown", function( e ) {
    		e.preventDefault();
    		e.stopPropagation();
			console.log("play sound: " + event.sentence.dialogueText);				
		}.bind( this ), false );
    	
    	var paragraph = event.DOM.querySelector("p");    	    	        	
    	paragraph.appendChild( icon );    	    	   	    	  
    },    
});

var BackgroundLayer = me.ImageLayer.extend({
  init: function(image, z, speed) {
    name = image;
    width = 900;
    height = 600;
    ratio = 1;
    this.fixed = speed > 0 ? false : true;
    // call parent constructor
    this.parent(name, width, height, image, z, ratio);
  },

  update: function() {
    if (!this.fixed) {
      if (this.pos.x >= this.imagewidth - 1)
        this.pos.x = 0;
      this.pos.x += this.speed;
    }
    return true;
  }
});

// Level 1 entities

game.HUDL1 = game.HUD || {};

game.HUDL1.Container = me.ObjectContainer.extend({

  init: function() {
    // call the constructor
    this.parent();

    // persistent across level change
    this.isPersistent = true;

    // non collidable
    this.collidable = false;

    // make sure our object is always draw first
    this.z = Infinity;

    // give a name
    this.name = "HUD";

    // add our child score object at the top left corner
    for (i = 0; i < game.ItemL1Types.length; i++)
        this.addChild(new game.HUDL1.ScoreItem((i+1)*100, 5, game.ItemL1Types[i]));
  }
});

game.HUDL1.ScoreItem = me.Renderable.extend({
  /**
   * constructor
   */
  init: function(x, y, itemType) {
    this.x = x;
    this.y = y;
    this.itemType = itemType;
    
    // call the parent constructor
    // (size does not matter here)
    this.parent(new me.Vector2d(x, y), 10, 10);

    // local copy of the global score
    this.scoreFont = new me.Font('gamefont', 50, '#000', 'left');

    // make sure we use screen coordinates
    this.floating = true;
  },

  update: function() {
    return true;
  },

  draw: function (context) {
    if (true){
        this.scoreFont.draw(context, game.Level1.scores[this.itemType], this.x, 10);
    }
  }
});


game.PlayerL1Entity = me.ObjectEntity.extend({
    init: function(x, y) {
          var settings = {};
          settings.image = me.loader.getImage('player_l1');
          settings.width = 85;
          settings.height = 60;
          settings.spritewidth = 85;
          settings.spriteheight = 60;

          this.parent(x, y, settings);
          this.alwaysUpdate = true;
          this.collidable = true;
          this.gravity = 0.98;
          this.maxVel = 7;

          this.renderable.addAnimation("idle", [0]);
          this.renderable.addAnimation("running", [0, 1, 2]);
          this.renderable.setCurrentAnimation("idle");
          this.animation = "idle";

          this.addShape(new me.Rect(new me.Vector2d(0, 0), 70, 50));
    },

    update: function(dt) {
          if (me.input.isKeyPressed('left')) {
              // Filp the sprite horizontally
              this.flipX(true);
              // update player's acceleration
              this.accel.x = -1;
          } else if (me.input.isKeyPressed('right')) {
              // Unflip sprite horizontally
              this.flipX(false);
              // update player's acceleration
              this.accel.x = 1;
          } else {
              // Make the playyer stop gradually
              if (this.vel.x > 0.5)
                  this.accel.x = -0.2;
              else if (this.vel.x < -0.5)
                  this.accel.x = 0.2;
              else {
                  this.accel.x = 0;
                  this.vel.x = 0;
              }
          }

          if (me.input.isKeyPressed('space') && !(this.jumping || this.falling)) {
            this.jumping = true;
            this.accel.y = -5;
          } else if (this.accel.y < 0){
            this.accel.y += 0.7;
          }

          // Update player's velocity
          this.vel.x += this.accel.x * me.timer.tick;
          this.vel.y += this.accel.y * me.timer.tick;
          
          // Avoid passing the maximum speed
          this.vel.x = Math.min(this.vel.x, this.maxVel);
          this.vel.x = Math.max(this.vel.x, (-this.maxVel));

          // Check end of screen
          if ((this.pos.x <= 0 && this.vel.x < 0) || (this.pos.x >= (me.game.viewport.width - this.width) && this.vel.x > 0))
              this.vel.x = 0;
 
          // Update player's position
          // Function ComputeVelocity considers physics interactions
          this.computeVelocity(this.vel);
          if ((this.pos.y + this.vel.y) > 442) {
              this.vel.y = (442 - this.pos.y);
              this.falling = false;
          }
          this.pos.add(this.vel);

          // Update object animation
          if (this.vel.x != 0 && this.animation == "idle"){
              this.animation = "running";
              this.renderable.setCurrentAnimation("running");
          } else if (this.vel.x == 0 && this.animation == "running"){
              this.animation = "idle";
              this.renderable.setCurrentAnimation("idle");
          }

          this.parent(dt);
          return true;
    },

});

game.ItemL1Types = ["book", "deadline", "cost", "cucumber"];//{book : 0, deadline : 1, cost : 2, cucumber : 3};

game.ItemL1Entity = me.CollectableEntity.extend({
    init: function(x, y, type) {
        var settings = {};
        this.itemType = type;
        console.log("tipo: "+this.itemType);
        settings.image = me.loader.getImage('item_l1_'+this.itemType);
        settings.width = 40;
        settings.height = 33;
        settings.spritewidth = 40;
        settings.spriteheight = 33;

        this.parent(x, y, settings);
        this.alwaysUpdate = true;
        this.gravity = 0.1;
        this.collidable = true;
        this.setVelocity(0, 3);
        this.addShape(new me.Rect(new me.Vector2d(0, 0), 40, 33));
   },

    update: function(dt) {
        // Update item's position
        this.computeVelocity(this.vel);
        this.pos.add(this.vel);
 
        // Treat collisions
        var res = me.game.collide(this);
        if (res) {
            this.collidable = false;
            me.game.remove(this);
            if (this.pos.y < 471) {
                console.log("colidiu! tipo: "+this.itemType);
                game.Level1.scores[game.ItemL1Types[this.itemType]] += 1;
            }
        }

        return true;
    },

});

var ItemGenerator = me.Renderable.extend({
    init: function() {
        this.parent(new me.Vector2d(), me.game.viewport.width, me.game.viewport.height);
        this.alwaysUpdate = true;
        this.generate = 0;
        this.itemFrequency = 90;
        this.posY = 50;
    },

    update: function(dt) {
        if ((this.generate++ % this.itemFrequency) == 0) {
            var posX = Math.round((Math.random() * 1000) % me.game.viewport.width);
            var type = Math.round((Math.random() * 10) % 1) + 0;
            var item = new me.entityPool.newInstanceOf("item_l1", posX, this.posY, type);
            console.log("Criando item... (tipo: "+type+")");
            me.game.world.addChild(item, 10);
        }
        return true;
    }
});

var GroundL1Entity = me.ObjectEntity.extend({
    init: function(x, y) {
        var settings = {};
        settings.image = me.loader.getImage('ground_l1');
        settings.width = me.game.viewport.width;
        settings.height = 96;
        settings.spritewidth = me.game.viewport.width;
        settings.spriteheight = 96;

        this.parent(x, y, settings);
        this.alawaysUpdate = true;
        this.gravity = 0;
        this.collidable = true;
        this.addShape(new me.Rect(new me.Vector2d(0, 0), me.game.viewport.width, 96));
    },

    update: function(){
        return true;
    }
});

// Level 3 entities

game.HeroEntity = game.BaseEntity.extend({
  
    init: function(x, y, settings) {
    	
    	settings.image = "boy";
    	settings.spritewidth = 24;
    	settings.spriteheight = 36;
    	    	    	      
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity( 3, 3);
              
        this.gravity = 0;
        this.setFriction(0.5, 0.5);
                       
        this.collidable = true;
                            
        this.renderable.addAnimation("down", [0,1,2]);
        this.renderable.addAnimation("left", [3,4,5]);
        this.renderable.addAnimation("right", [6,7,8]);
        this.renderable.addAnimation("up", [9,10,11]);
                
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);     
        
        this.direction = "down"; 
        
		//has to bee release
        me.input.registerPointerEvent('mousedown', me.game.viewport, this.onMouseDown.bind(this));                	                	      			                                  
    },
   
    update: function() {     	    	   	    
    	this._calculateStep();
    	        	    	    	    	    	    	    	                                                                                                          
        // check & update player movement
        this.updateMovement();
                                   
        // check for collision
        var res =  me.game.world.collide(this);    	
    	if (res && (res.obj.type == me.game.ENEMY_OBJECT)) {        		    		  		    		  		    	  
    		delete this._target;    		
    		this.pos.x -= res.x;
    		this.pos.y -= res.y;    
    		
            if ( !res.obj.level31.isFinished() ){
                res.obj.level31.onResetEvent();	 		    		 		    		    		    		   		    		      		    		    		    			    		    				    	
            }
    	}
    	    	    	    	        	    	                   	         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {        	        	        	        	     
            // update object animation
            this.parent();
            return true;
        }
                                       	    	                     
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }, 
                  
    /**
	 * Mouse down handler
	 * @param {Event} e - MelonJS Event Object 
	 */  
    onMouseDown: function(e){
    	this._target = {};        	   	  	    	   	  
    	this._target.x = e.gameWorldX - Math.floor( this.width / 2 );    	
    	this._target.y = e.gameWorldY - Math.floor( this.height / 2 );        	  
    	this._setDirection(this._target.x - this.pos.x, this._target.y - this.pos.y);    
    	this.renderable.setCurrentAnimation( this.direction );
    	
    	// Hero just talking
    	if( this.talkWith ){
    		this.talkWith.dialog.reset();  
    		delete this.talkWith;  		
    	}        	    	  		    	
    }, 
    
    onDestroyEvent : function() {		
		me.input.releasePointerEvent('mousedown', me.game.viewport);	
    },      
});

game.GirlEntity = game.BaseEntity.extend({
	
	init: function(x, y, settings) {
    	
    	settings.image = "girl";
    	settings.spritewidth = 24;
    	settings.spriteheight = 36;
    	    	    	      
        // call the constructor
        this.parent(x, y, settings);
                
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity( 2, 2);
              
        this.gravity = 0;
        this.setFriction(0.5, 0.5);
                       
        this.collidable = true;        
        this.type = me.game.ENEMY_OBJECT;
                            
        this.renderable.addAnimation("down", [0,1,2]);
        this.renderable.addAnimation("left", [3,4,5]);
        this.renderable.addAnimation("right", [6,7,8]);
        this.renderable.addAnimation("up", [9,10,11]);
                
		this.minX = x;
        this.minY = y;
        this.maxX = x + settings.width - settings.spritewidth;
        this.maxY = y + settings.height - settings.spriteheight;
                                                                                                                                                       			
        this.level31 = new game.Level3.MiniGame1();		  							    	        	       
	},
	
    update: function() {    	        
        if (!this.inViewport){
        	return false;
        }
            
        this._calculateStep();
    	           
        this.updateMovement();
                  	                    
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        
        return false;
    },
                       
    /**
    * set a target position
    * @private
 	* @param {number} x - pos x
 	* @param {number} y - pos y
    */
    _setTargetPosition:function(x, y){
    	this._target = {};        	   	  	    	   	  
    	this._target.x = x;    	
    	this._target.y = y;    
    	this._setDirection(this._target.x - this.pos.x, this._target.y - this.pos.y);      
    	this.renderable.setCurrentAnimation( this.direction );    
    },	
    
    /**
	 * on destroy handler
	 */
    onDestroyEvent : function() {		
		clearInterval( this.walkInterval );	
    }, 
});
