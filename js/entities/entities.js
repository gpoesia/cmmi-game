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
  //   	var icon = document.createElement( "i" );
  //   	icon.setAttribute( "class", "glyphicon glyphicon-volume-up");
  //   	icon.addEventListener( me.device.touch ? "touchstart" : "mousedown", function( e ) {
  //   		e.preventDefault();
  //   		e.stopPropagation();
		// 	console.log("play sound: " + event.sentence.dialogueText);				
		// }.bind( this ), false );
    	
    	var paragraph = event.DOM.querySelector("p");    	    	        	
    	// paragraph.appendChild( icon );    	    	   	    	  
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
    for (i = 0; i < game.ItemL1Types.length; i++){
        this.addChild(new game.HUDL1.IconItem(((i+1)*100)-65, 15, "item_l1_"+i));
        this.addChild(new game.HUDL1.ScoreItem((i+1)*100, 5, game.ItemL1Types[i]));
    }
  }
});

game.HUDL1.IconItem = me.SpriteObject.extend({
    init: function(x, y, image) {
          this.parent(x, y, me.loader.getImage(image), 800, 600);
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
          settings.width = 60;
          settings.height = 70;
          settings.spritewidth = 60;
          settings.spriteheight = 70;

          this.parent(x, y, settings);
          this.alwaysUpdate = true;
          this.collidable = true;
          this.gravity = 0.98;
          this.maxVel = 7;

          this.renderable.addAnimation("idle", [9]);
          this.renderable.addAnimation("running", [9, 12, 14, 16, 19, 21, 23, 1, 3, 6]);
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

game.ItemL1Types = ["book", "cucumber", "deadline", "cost"];

game.ItemL1Entity = me.CollectableEntity.extend({
    init: function(x, y, type) {
        var settings = {};
        this.itemType = type;
        console.log("tipo: "+this.itemType);
        settings.image = me.loader.getImage('item_l1_'+this.itemType);
        settings.width = 40;
        settings.height = 41;
        settings.spritewidth = 40;
        settings.spriteheight = 41;

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
                var completeCount = 0;
                console.log("length:"+game.ItemL1Types.length);
                for (i = 0; i < game.ItemL1Types.length; i++){
                    if (game.Level1.scores[game.ItemL1Types[i]] >= 10)
                        completeCount++;
                }
                if (completeCount == game.ItemL1Types.length)
                    window.alert("Parabens! Voce conseguiu.\nComece agora a melhorar sua empresa avancando pelos niveis do CMMI.");
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
        this.itemFrequency = 50;
        this.posY = 50;
    },

    update: function(dt) {
        if ((this.generate++ % this.itemFrequency) == 0) {
            var posX = Math.floor((Math.random() * 1000) % me.game.viewport.width);
            var type = Math.floor((Math.random() * 10) % 4);
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
        this.collidable = false;
        this.addShape(new me.Rect(new me.Vector2d(0, 0), me.game.viewport.width, 96));
    },

    update: function(){
        return true;
    }
});

// Level 2 entities

game.PlayerL2Entity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
          this.parent(x, y, settings);
          this.gravity = 0;
          
          this.renderable.addAnimation("down", [0,1,2,3]);
          this.renderable.addAnimation("left", [4,5,6,7]);
          this.renderable.addAnimation("right", [8,9,10,11]);
          this.renderable.addAnimation("up", [12,13,14,14]);

          this.direction = "down";

          //Collidable
          this.collidable = true;
    },

    update: function(dt) {
          if (me.input.isKeyPressed('left')) {
              // update player's acceleration
              this.vel.x = -5;
              this.vel.y = 0;
              if (this.direction != "left") {
                  this.direction = "left";
                  this.renderable.setCurrentAnimation("left");
              }
          } else if (me.input.isKeyPressed('right')) {
              // update player's acceleration
              this.vel.x = 5;
              this.vel.y = 0;
              if (this.direction != "right") {
                  this.direction = "right";
                  this.renderable.setCurrentAnimation("right");
              }
          } else if (me.input.isKeyPressed('up')) {
              // update player's acceleration
              this.vel.x = 0;
              this.vel.y = -5;
              if (this.direction != "up") {
                  this.direction = "up";
                  this.renderable.setCurrentAnimation("up");
              }
          } else if (me.input.isKeyPressed('down')) {
              // update player's acceleration
              this.vel.x = 0;
              this.vel.y = 5;
              if (this.direction != "down") {
                  this.direction = "down";
                  this.renderable.setCurrentAnimation("down");
              }
          } else {
              this.vel.x = 0;
              this.vel.y = 0;
          }

          this.updateMovement();
          if (this.vel.x != 0 || this.vel.y != 0){
            this.parent(dt);
            return true;
          }

          console.log("posX: " + this.pos.x + " posY: " + this.pos.y);
          return false;
    },

});

game.ExclamationEntity = me.CollectableEntity.extend({
	
	init: function(x, y, settings) {
    	
    	settings.image = "meurecurso";
    	settings.spritewidth = 36;
    	settings.spriteheight = 36;
   	    	    	      
        // call the constructor
        this.parent(x, y, settings);
                
        this.gravity = 0;
        this.setFriction(0.5, 0.5);
                       
        this.collidable = true;        
                            
        this.renderable.addAnimation("down", [0,1,2]);
        this.renderable.addAnimation("left", [3,4,5]);
        this.renderable.addAnimation("right", [6,7,8]);
        this.renderable.addAnimation("up", [9,10,11]);
                
		this.minX = x;
        this.minY = y;
        this.maxX = x + settings.width - settings.spritewidth;
        this.maxY = y + settings.height - settings.spriteheight;
        this.addShape(new me.Rect(new me.Vector2d(0, 0), 40, 33));

        this.level21 = new game.Level2.MiniGame1();
        this.level22 = new game.Level2.MiniGame2();
        this.level23 = new game.Level2.MiniGame3();
        this.level24 = new game.Level2.MiniGame4();
	},
	
    update: function(dt) {    	        
            
        this.updateMovement();
                  	                    
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        var res =  me.game.world.collide(this);    
        if (res) {
            // MiniGame1
            if (game.Level2.scores.activity == 0) {
                // Hardi coded positions 
                this.pos.x = 354;
                this.pos.y = 496;
                game.Level2.scores.activity += 1;
                this.level21.onResetEvent();
            // MiniGame2
            } else if (game.Level2.scores.activity == 1) {
                // Hardcoded 
                this.pos.x = 134;
                this.pos.y = 498;
                game.Level2.scores.activity += 1;
                this.level22.onResetEvent();
            // MiniGame3    
            } else if (game.Level2.scores.activity == 2) {
                // Hardcoded 
                this.pos.x = 289;
                this.pos.y = 111;
                game.Level2.scores.activity += 1;
                this.level23.onResetEvent();
            } else if (game.Level2.scores.activity == 3) {
                // Hardcoded 
                game.Level2.scores.activity += 1;
                this.level24.onResetEvent();
            } else if (game.Level2.scores.activity == 4) {
                alert("Parabéns, você concluiu o nível 2!");
                // return to menu
                me.game.remove(this);
                return true

            }        
        }
        return false;
    },
 

});

// Level 3 entities

game.HeroEntity = game.BaseEntity.extend({
  
    init: function(x, y, settings) {
    	
    	settings.image = "boy";
    	settings.spritewidth = 32;
    	settings.spriteheight = 32;
    	    	    	      
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
    		
            if ( res.obj.level32 ){
                console.log("32");
                if (game.data.level31 == true) {
                   res.obj.level32.onResetEvent();   
                } else {
                    this.doTalk( res.obj );
                }; 		    		 		    		    		    		   		    		      		    		    		    			    		    				    	
            }
            else if ( res.obj.level31 && !res.obj.level31.isFinished() ){
                res.obj.level31.onResetEvent();                                                                                                                                                                                 
            }
            else {
                this.doTalk( res.obj );
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
     * Start conversation
     * @param {Object} entity
     */
    doTalk:function( entity ){
        entity.isTalking = true;
        this.talkWith = entity;     
        entity.dialog.show();
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
                                                                                                                                                       			
        // this.level31 = new game.Level3.MiniGame1();		  	
        // create dialog
        this.dialog = new game.Dialog( DIALOGUES[ this.name ], this.onDialogReset.bind(this), this.onDialogShow.bind(this));						    	        	       
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

game.Girl1Entity = game.BaseEntity.extend({
    
    init: function(x, y, settings) {
        
        settings.image = "girl1";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
                              
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
                                                                                                                                                                
        // this.level31 = new game.Level3.MiniGame1();          
        // create dialog
        this.dialog = new game.Dialog( DIALOGUES[ this.name ], this.onDialogReset.bind(this), this.onDialogShow.bind(this));                                                   
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

game.Girl2Entity = game.BaseEntity.extend({
    
    init: function(x, y, settings) {
        
        settings.image = "girl2";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
                              
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
                                                                                                                                                                
        // this.level31 = new game.Level3.MiniGame1();          
        // create dialog
        this.dialog = new game.Dialog( DIALOGUES[ this.name ], this.onDialogReset.bind(this), this.onDialogShow.bind(this));                                                   
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


game.Prog1Entity = game.BaseEntity.extend({
    
    init: function(x, y, settings) {
        
        settings.image = "prog1";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
                              
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
                                                                                                                                                                
        // this.level31 = new game.Level3.MiniGame1();          
        // create dialog
        this.dialog = new game.Dialog( DIALOGUES[ this.name ], this.onDialogReset.bind(this), this.onDialogShow.bind(this));                                                   
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

game.Prog2Entity = game.BaseEntity.extend({
    
    init: function(x, y, settings) {
        
        settings.image = "prog2";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
                              
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
                                                                                                                                                                
        // this.level31 = new game.Level3.MiniGame1();          
        // create dialog
        this.dialog = new game.Dialog( DIALOGUES[ this.name ], this.onDialogReset.bind(this), this.onDialogShow.bind(this));                                                   
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

game.Prog3Entity = game.BaseEntity.extend({
    
    init: function(x, y, settings) {
        
        settings.image = "prog3";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
                              
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
                                                                                                                                                                
        // this.level31 = new game.Level3.MiniGame1();          
        // create dialog
        this.dialog = new game.Dialog( DIALOGUES[ this.name ], this.onDialogReset.bind(this), this.onDialogShow.bind(this));                                                   
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

game.BossEntity = game.BaseEntity.extend({
    
    init: function(x, y, settings) {

        settings.image = "boss";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
                              
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

        this.level32 = new game.Level3.MiniGame2();
        this.dialog = new game.Dialog( DIALOGUES[ this.name ], this.onDialogReset.bind(this), this.onDialogShow.bind(this));                                                                                                                                                                                 
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

game.BossFinalEntity = game.BaseEntity.extend({
    
    init: function(x, y, settings) {
        
        settings.image = "boss2";
        settings.spritewidth = 32;
        settings.spriteheight = 32;
                              
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
        this.dialog = new game.Dialog( DIALOGUES[ this.name ], this.onDialogReset.bind(this), this.onDialogShow.bind(this));       
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
