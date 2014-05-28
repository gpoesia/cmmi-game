// CMMI Game Level 5 - 2 mini-games
  clocks = [0,0,0,0,0];
  control = [[3, 1, -1, 0, 1],
   [-1, 3, 2, 1, 0],
   [-1, 2, 3, 1, 1],
   [1, 1, -1, 3, 1],
   [0, 1, 0, 2, 3]]

  function evaluateAlignment(){
    if(clocks[0] == 0 &&  clocks[1] == 0 && clocks[2] == 0 &&clocks[3] == 0 &&clocks[4] == 0 )
      return true;
    return false;
  }

function updateValues(direction, clock_id){
   pre_clocks = [0,0,0,0,0]
   if(direction == 1){
     pre_clocks[0] = (clocks[0] + control[clock_id][0])%12;
     pre_clocks[1] = (clocks[1] + control[clock_id][1])%12;
     pre_clocks[2] = (clocks[2] + control[clock_id][2])%12;
     pre_clocks[3] = (clocks[3] + control[clock_id][3])%12;
     pre_clocks[4] = (clocks[4] + control[clock_id][4])%12;
    }else{
     pre_clocks[0] = (clocks[0] - control[clock_id][0])%12;
     pre_clocks[1] = (clocks[1] - control[clock_id][1])%12;
     pre_clocks[2] = (clocks[2] - control[clock_id][2])%12;
     pre_clocks[3] = (clocks[3] - control[clock_id][3])%12;
     pre_clocks[4] = (clocks[4] - control[clock_id][4])%12;
    }
  clocks[0] = (pre_clocks[0] < 0) ? 12 + pre_clocks[0] : pre_clocks[0];
  clocks[1] = (pre_clocks[1] < 0) ? 12 + pre_clocks[1] : pre_clocks[1];
  clocks[2] = (pre_clocks[2] < 0) ? 12 + pre_clocks[2] : pre_clocks[2];
  clocks[3] = (pre_clocks[3] < 0) ? 12 + pre_clocks[3] : pre_clocks[3];
  clocks[4] = (pre_clocks[4] < 0) ? 12 + pre_clocks[4] : pre_clocks[4];
}

function controlClick(direction, clock_id){
  updateValues(direction, clock_id);
  updateView(clocks);
  return evaluateAlignment();
}




function scramble(){
  for(i = 0; i < 10; i++){
    random_id = Math.floor(Math.random()*5);

    random_direction = Math.floor(Math.random()*10 + 1)%2;
    //console.log(random_id + " " + random_direction);
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
function destroyLevel(){
  Clear("level5");
  Clear("level5_controls");
  ShowMelonJS();
}

game.Level5 = {


  MiniGame1: me.ScreenObject.extend({
    init: function(){
    },

    onResetEvent: function(){
      HideMelonJS();
      console.log("Setting level 5 map");
      $("#game").append("<div id='level5'></div>");
      $("#game").append("<div id='level5_controls' class='controls' ></div><div class='clearBoth></div>");
      this.play();
    },

    onDestroyEvent: function(){
    },

    play: function(){
      scramble();
      $("#level5").append("<p>Nos níveis mais altos do CMMI, um dos aspectos mais importantes é que os processos e objetivos estejam alinhados. Cada circulo abaixo representa um processo de sua empresa. O objetivo do mini-game é fazer todos os circulos se completarem. Para fazer isto, é necessário alguns ajustes em todos os processos, mas lembre-se: alterar um processo pode afetar outros processos.<p>");
      $("#level5").append("<div id='clock_one'></div>");
      $("#level5").append("<div id='clock_two'></div>");
      $("#level5").append("<div id='clock_three'></div>");
      $("#level5").append("<div id='clock_four'></div>");
      $("#level5").append("<div id='clock_five'></div>");
      $("#level5_controls").append("<div id='control_one' class='controls controls_size'></div>"
          + "<div id='control_two' class='controls controls_size'></div>"
          + "<div id='control_three' class='controls controls_size'></div>"
          + "<div id='control_four' class='controls controls_size'></div>"
          + "<div id='control_five' class='controls controls_size'></div>")

     $("#control_one").append("<p>Primeiro Controle</p><input type='button' class='btn' id='control1l' value='Left' onClick='controlClick(0,0)'></input><input type='button' class='btn' id='control1r' value='Right' onClick='controlClick(1,0)'></input>");
     $("#control_two").append("<p>Segundo Controle</p><input type='button' class='btn'  id='control2l' value='Left' onClick='controlClick(0,1)'></input><input type='button' class='btn' id='control2r' value='Right' onClick='controlClick(1,1)'></input><br>");
     $("#control_three").append("<p>Terceiro Controle</p><input type='button' class='btn' id='control3l' value='Left' onClick='controlClick(0,2)'></input><input type='button' class='btn' id='control3r' value='Right' onClick='controlClick(1,2)'></input><br>");
      $("#control_four").append("<p>Quarto Controle</p><input type='button' class='btn'  id='control4l' value='Left' onClick='controlClick(0,3)'></input><input type='button' class='btn' id='control4r' value='Right' onClick='controlClick(1,3)'></input><br>");
      $("#control_five").append("<p>Quinto Controle</p><input type='button' class='btn' id='control5l' value='Left' onClick='controlClick(0,4)'></input><input type='button' class='btn'  id='control5r' value='Right' onClick='controlClick(1,4)'></input><br>");
      $(".btn").click(function(){
        if(evaluateAlignment()){
          $("#level5_controls").html("<p> Parabéns, você conseguiu cumprir todos os desafios. Agora que você conhece um pouco mais sobre o CMMI.</p><input type='button' id='finishmm51' value='Próximo desafio' onClick='destroyLevel()'></input>");
          me.state.change(me.state.MENU);
        }
      });

      setUp(0, "#clock_one", clocks[0]);
      setUp(1, "#clock_two", clocks[1]);
      setUp(2, "#clock_three", clocks[2]);
      setUp(3, "#clock_four", clocks[3]);
      setUp(4, "#clock_five", clocks[4]);
    },



  }),



};

