// CMMI Game Level 5 - 2 mini-games
  clocks = [0,0,0,0,0];
  control = [[3, 1, -1, 0, 1],
   [-1, 3, 2, 1, 0],
   [-1, 2, 3, 1, 1],
   [1, 1, -1, 3, 1],
   [0, 1, 0, 2, 3]]

function updateValues(direction, clock_id){
   if(direction == 1){
      clocks[0] = (clocks[0] + control[clock_id][0])%12;
      clocks[1] = (clocks[1] + control[clock_id][1])%12;
      clocks[2] = (clocks[2] + control[clock_id][2])%12;
      clocks[3] = (clocks[3] + control[clock_id][3])%12;
      clocks[4] = (clocks[4] + control[clock_id][4])%12;
    }else{
      clocks[0] = (clocks[0] - control[clock_id][0])%12;
      clocks[1] = (clocks[1] - control[clock_id][1])%12;
      clocks[2] = (clocks[2] - control[clock_id][2])%12;
      clocks[3] = (clocks[3] - control[clock_id][3])%12;
      clocks[4] = (clocks[4] - control[clock_id][4])%12;
    }


}

function controlClick(direction, clock_id){
  updateValues(direction, clock_id);
  updateView();
}

function updateView(){
   $("#clock_one").html(clocks[0] + "");
   $("#clock_two").html(clocks[1] + "");
   $("#clock_three").html(clocks[2] + "");
   $("#clock_four").html(clocks[3] + "");
   $("#clock_five").html(clocks[4] + "");
}


function scramble(){
  for(i = 0; i < 10; i++){
    random_id = Math.floor(Math.random()*5);
    console.log(random_id + "");
    random_direction = Math.floor(Math.random()*10 + 1)%2;
    updateValues(random_direction, random_id);

  }

}



function HideMelonJS() {
    $("#screen").css("display", "none");
}

function ShowMelonJS() {
    $("#screen").css("display", "inline");
}

function Clear(divId) {
    $("#" + divId).html("");
}

game.Level5 = {


  MiniGame1: me.ScreenObject.extend({
    init: function(){
    },

    onResetEvent: function(){
      HideMelonJS();
      console.log("Setting level 5 map");
      $("#game").append("<div id='level5'></div>");
      $("#game").append("<div id='level5_controls'></div>");
      this.play();
    },

    onDestroyEvent: function(){
    },

    play: function(){
      scramble();
      $("#level5").append("<p> Alinhe os seus processos aos objetivos da empresa, mas lembre-se: alterar um processo pode afetar outros processos.<p>");
      $("#level5").append("<div id='clock_one'></div>");
      $("#level5").append("<div id='clock_two'></div>");
      $("#level5").append("<div id='clock_three'></div>");
      $("#level5").append("<div id='clock_four'></div>");
      $("#level5").append("<div id='clock_five'></div>");
      $("#level5_controls").append("<p>Primeiro Controle</p><input type='button' id='control1l' value='Left' onClick='controlClick(0,0)'></input><input type='button' id='control1r' value='Right' onClick='controlClick(1,0)'></input>" +
      "<p>Segundo Controle</p><input type='button' id='control2l' value='Left' onClick='controlClick(0,1)'></input><input type='button' id='control2r' value='Right' onClick='controlClick(1,1)'></input><br>" +
      "<p>Terceiro Controle</p><input type='button' id='control3l' value='Left' onClick='controlClick(0,2)'></input><input type='button' id='control3r' value='Right' onClick='controlClick(1,2)'></input><br>" +
      "<p>Quarto Controle</p><input type='button' id='control4l' value='Left' onClick='controlClick(0,3)'></input><input type='button' id='control4r' value='Right' onClick='controlClick(1,3)'></input><br>" +
      "<p>Quinto Controle</p><input type='button' id='control5l' value='Left' onClick='controlClick(0,4)'></input><input type='button' id='control5r' value='Right' onClick='controlClick(1,4)'></input><br>");
      $("#clock_one").append(clocks[0] + "");
      $("#clock_two").append(clocks[1] + "");
      $("#clock_three").append(clocks[2] + "");
      $("#clock_four").append(clocks[3] + "");
      $("#clock_five").append(clocks[4] + "");
    //  $("#clock_one").tzineClock();
    //  $("#clock_two").tzineClock();
    //  $("#clock_three").tzineClock();
    //  $("#clock_four").tzineClock();
    //  $("#clock_five").tzineClock();
    },

  }),

};

