// CMMI Game Level 2

function HideMelonJS() {
    $("#screen").css("display", "none");
}

function ShowMelonJS() {
    $("#screen").css("display", "inline");
}

function MakeVisibleMiniGame1() {
    $("#level21").css("display", "inline");
}

function MakeInvisibleMiniGame1() {
    $("#level21").css("display", "none");
}

function MakeVisibleMiniGame2() {
    $("#level22").css("display", "inline");
}

function MakeInvisibleMiniGame2() {
    $("#level22").css("display", "none");
}

function MakeVisibleMiniGame3() {
    $("#level23").css("display", "inline");
}

function MakeInvisibleMiniGame3() {
    $("#level23").css("display", "none");
}

function MakeVisibleMiniGame4() {
    $("#level24").css("display", "inline");
}

function MakeInvisibleMiniGame4() {
    $("#level24").css("display", "none");
}

game.Level2 = { 
    scores: {
                activity : 0
            },

    MiniGame0: me.ScreenObject.extend({
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

    MiniGame1: me.ScreenObject.extend({
        
        init: function() {
        },
        
        onResetEvent: function() {
            console.log("Starting Meeting");
            HideMelonJS();
            MakeVisibleMiniGame1();
            this.play();
        },

    play: function(){
        self = this;
        var isTrue = false;

        $("#botao").click(function() {
            // Checks if Correct Questions were made
            // var y is an array that contains if the correct question was checked before pressing the button
            var y = [$("#Perg1").is(":checked"),$("#Perg2").is(":checked"),$("#Perg3").is(":checked"),$("#Perg4").is(":checked")];

            // var i is the number of questions validated
            var i = 0;

            // Checks to see if all 4 questions were made
            for (var k=0; k < y.length; k++) {
                console.log("i[k]: "+y[k]);
                if (y[k] == true) {
                    i += 1;
                }
            }

            isTrue = false;
            // All the right questions were answered?
            if (i == 4) {
                isTrue = true;
            }

            // Check if any wrong question was asked
            var y2 = [$("#Perg5").is(":checked"),$("#Perg6").is(":checked"),$("#Perg7").is(":checked"),$("#Perg8").is(":checked")];

            // var i is the number of questions validated
            var i2 = 0;

            // Checks to see if all 4 questions were made
            for (var k=0; k < y2.length; k++) {
                console.log("i[k]: "+y2[k]);
                if (y2[k] == true) {
                    i2 += 1;
                }
            }

            // Were the wrong questions asked?
            if (i2 > 0) {
                isTrue = false;
            }

            if (!isTrue) {
                alert("As perguntas direcionadas para o cliente não foram boas. Lembre-se: Queremos entender o projeto dele o melhor possível, para isso devemos fazer perguntas concisas e com menos termos técnicos. Além disso, nosso objetivo é entender o que o cliente deseja e não questionar se o seu projeto possui ou não bom valor.\n\n Tente novamente! ");
            }

            //isTrue = true? Back to the game!
            if (isTrue) {
               alert("Parabéns! Suas perguntas foram excelentes!");
               ShowMelonJS();
               MakeInvisibleMiniGame1();
            }

            console.log("isTrue? "+ isTrue);
        });       
    },
        
    }),

    MiniGame2: me.ScreenObject.extend({
        
        init: function() {
        },
        
        onResetEvent: function() {
            console.log("Starting Meeting");
            HideMelonJS();
            MakeVisibleMiniGame2();
            this.play();
        },

    play: function(){
        self = this;
        var isTrue = false;

        $("#botao2").click(function() {
            // declaracoes
            hours_teamA = 0;
            hours_teamB = 0; 
            sal_teamA = 45;
            sal_teamB = 24;
            overwork = 1.5;
            PriceA = 0;
            PriceB = 0;
            totalProjPrice = 2200;
            startEndSameDate = false;
            graterThenFinish = false;
            noTeam = false;
            finishDate = "2014-05-11";
            weekend = "2014-05-10";

            dateA = [15];
            pointerA = 0;
            dateB = [15];
            pointerB = 0;

            for (var i = 1; i < 14; i += 2) {
                var sDate = document.getElementById(i+'Date').value;
                var eDate = document.getElementById(i+1+'Date').value;
                var team = document.getElementById('Team'+i).value;
                
                if (eDate > finishDate || sDate > finishDate) graterThenFinish = true;
                if (sDate == eDate) startEndSameDate = true;
                if (!team) noTeam = true;

                var Data1 = new Date(sDate);  
                var Data2 = new Date(eDate);
                var fData = Data2 - Data1;
                // milliseconds to hour (ms->sec->min->h/4 = 8h por dia)
                hours = fData / (1000*60*60*3)
                
                //As horas extras trabalhadas no final de semana serão caracterizadas como 1h->1.5h
                if (sDate >= weekend || eDate >= weekend) hours = hours*overwork;
                
                if (team == "a" || team == "A") {
                    hours_teamA += hours;
                    dateA[i-1] = sDate;
                    dateA[i] = eDate;
                    pointerA += 2;
                } else if (team == "b" || team == "B"){
                    hours_teamB += hours;
                    dateB[i-1] = sDate;
                    dateB[i] = eDate;
                    pointerB += 2;
                }
            } 


            if (hours_teamA <= 36 && hours_teamB <= 60) {

                // Avaliar se tem que pagar hora extra, TeamA so tem disponivel 20h
                if (hours_teamA <= 20) {
                    PriceA = hours_teamA*sal_teamA;
                } else {
                    PriceA = (hours_teamA-20)*overwork*sal_teamA;
                    PriceA += hours_teamA*sal_teamA;
                }

                // Avaliar se tem que pagar hora extra, TeamB so tem disponivel 40h
                if (hours_teamB <= 40) {
                    PriceB = hours_teamB*sal_teamB;
                } else {
                    PriceB = (hours_teamB-20)*overwork*sal_teamB;
                    PriceB += hours_teamB*sal_teamB;
                }    
              
                if (totalProjPrice >= (PriceA + PriceB)) {
                    isTrue = true;
                } else {
                    isTrue = false;
                    alert("Seu projeto ficou acima do custo máximo previsto!");
                }

            } else {
                isTrue = false;
                alert("Os seus funcionários ficaram sobrecarregados e o desgaste impediu a entrega de um site de qualidade dentro do tempo planejado");
            }

            // Atividades que ocorrem no mesmo dia não é permitido
            if (startEndSameDate) {
                isTrue = false;
                alert("Uma atividade não pode começar e terminar no mesmo dia");
            }
            if (noTeam) {
                isTrue = false;
                alert("Existe atividade que não possuem equipe alocadas!");
            }

            // Atividades não podem ter um mesmo começo. A próxima atividade só pode começar quando a anterior terminar
            if (isTrue) {
                for (k = 0; k < pointerA; k += 2) {
                    if (pointerA < 3) break;
                    if (dateA[k] > dateA[k+2]) {
                        isTrue = false;
                    }
                }
                for (k = 0; k < pointerB; k += 2) {
                    if (pointerB < 3) break;
                    if (dateB[k] > dateB[k+2]) {
                        isTrue = false;
                    }
                }
                if (!isTrue) alert("Existem atividades sendo sobrepostas. Uma atividade só pode começar quando a anterior terminar");
            } 

            //isTrue = true? Back to the game!
            if (isTrue) {
               alert("Parabéns! Bom Planejamento! Você manteve a data e o custo previsto dentro do planejado.");
               ShowMelonJS();
               MakeInvisibleMiniGame2();
            }
            // Debugar valor de transicao
            console.log("isTrue? "+ isTrue);
        });       
    },
        
    }),

  
    MiniGame3: me.ScreenObject.extend({
        
        init: function() {
        },
        
        onResetEvent: function() {
            console.log("Starting Meeting");
            HideMelonJS();
            MakeVisibleMiniGame3();
            this.play();
        },

    play: function(){
           
             $("#botao3").click(function() {
            // Checks if Correct Questions were made
            var isTrue = false;    
            console.log("botaozim apertado");
            if ($("#lv3Perg4").is(":checked") == true && $("#lv3Perg5").is(":checked") == true) {
                console.log("Botoeszinhos checkados"); 
                if($("#lv3Perg3").is(":checked") == false && $("#lv3Perg1").is(":checked") == false && $("#lv3Perg2").is(":checked") == false && $("#lv3Perg6").is(":checked") == false && $("#lv3Perg7").is(":checked") == false) {
                    isTrue = true;
                    console.log("resto_ta_false");
                }
            }
                
            //isTrue = true? Back to the game!
            if (isTrue) {
               alert("Parabéns!");
               ShowMelonJS();
               MakeInvisibleMiniGame3();
            }
            else {
                alert("Você deve definir um número de atividades pequena, mas com alto índice de problema (Índice de problem = Prob x Impacto). Escolher atividades demais pode causar atrasos no seu projeto," +
                        "escolher atividades de menos pode fazer com que um problema crítico ocorra e atrase seu projeto.")

            }

            console.log("isTrue? "+ isTrue);
        });       
          
          },

        }),       

    MiniGame4: me.ScreenObject.extend({
        
        init: function() {
        },
        
        onResetEvent: function() {
            console.log("Starting Meeting");
            HideMelonJS();
            MakeVisibleMiniGame4();
            this.play();
        },

    play: function(){
             self = this; 
             $("#botao4").click(function() {
            // Checks if Correct Questions were made
            var isTrue = false;    
            console.log("botaozim apertado");
            if ($("#lv4Perg1").is(":checked") == true && $("#lv4Perg3").is(":checked") == true && $("#lv4Perg5").is(":checked") == true) {
                console.log("Botoeszinhos checkados"); 
                if($("#lv4Perg2").is(":checked") == false && $("#lv4Perg4").is(":checked") == false && $("#lv4Perg6").is(":checked") == false) {
                    isTrue = true;
                    console.log("resto_ta_false");
                }
            }
                
            //isTrue = true? Back to the game!
            if (isTrue) {
               alert("Parabéns!");
               MakeInvisibleMiniGame4();
               ShowMelonJS();
               me.state.change(me.state.MENU);
            }
            else {
                alert("Algumas das alternativas que você escolheu podem não ser boas opções para motivas a sua equipe")

            }

            console.log("isTrue? "+ isTrue);
        });       
          
          },

        }), 
};
