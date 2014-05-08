// CMMI Game Level 3

function HideMelonJS() {
    $("#screen").css("display", "none");
}

function ShowMelonJS() {
    $("#screen").css("display", "inline");
}

function Clear(divId) {
    $("#" + divId).html("");
}

$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });

    return this;
};

game.Level3 = {
    MiniGame0: me.ScreenObject.extend({
        init: function() {
        },

        onResetEvent: function() {
            console.log("Resetting level 3 Map.");
            me.levelDirector.loadLevel("town");
        },

        onDestroyEvent: function() {
        },
    }),

    MiniGame1: me.ScreenObject.extend({
        init: function() {
            self.finished = false;
        },

        isFinished: function() {
            return self.finished;
        },

        onResetEvent: function() {
            console.log("Resetting level 3.");
            HideMelonJS();
            $("#game").append("<div id='level3'></div>");
            this.play();
        },

        onDestroyEvent: function() {
            ShowMelonJS();
            $("#level3").replaceWith("");
        },


        play: function() {
            $("#level3").append("<p>Você, nosso mais novo estagiário de desenvolvimento, tem de ajudar o nosso especialista em requisitos, o Rodolfo."+" Nosso último estagiário misturou os requisitos que tinham de voltar pra prancheta com os prontos para implementação, precisamos que você os reorganize e submeta para aprovação do chefe!");
            $("#level3").append("<div class=\"cf nestable-lists\">" +
                "<div class=\"dd\" id=\"nestable\">"+
                    "<ol class=\"dd-list\">"+
                        "<li class=\"dd-item\" data-id=\"1\">"+
                            "<div class=\"dd-handle\">Requisitos</div>"+
                        "</li>"+
                        "<li class=\"dd-item\" data-id=\"2\">"+
                            "<div class=\"dd-handle\">Requisitos Mal Formulados</div>"+
                        "</li>"+
                    "</ol>"+
                "</div>"+
                "<div class=\"dd\" id=\"nestable2\">"+
                    "<ol class=\"dd-list\">"+
                        "<li class=\"dd-item\" data-id=\"4\">"+
                        "<div class=\"dd-handle\">A ferramenta deve ser desenvolvida em dois módulos independentes: financeiro e gerencial</div>"+
                        "</li>"+
                        "<li class=\"dd-item\" data-id=\"5\">"+
                        "<div class=\"dd-handle\">Um usuário deve ser capaz de acessar a ferramenta com qualquer sistema operacional</div>"+
                        "</li>"+
                        "<li class=\"dd-item\" data-id=\"6\">"+
                        "<div class=\"dd-handle\">Os modulos devem se comunicar de forma transparente para o usuário</div>"+
                        "</li>"+
                        "<li class=\"dd-item\" data-id=\"7\">"+
                        "<div class=\"dd-handle\">A interação com o sistema por parte dos usuários deve ser feita exclusivamente através da interface gráfica escolhida pelo cliente</div>"+
                        "</li>"+
                        "<li class=\"dd-item\" data-id=\"8\">"+
                        "<div class=\"dd-handle\">O sistema deve atender múltiplos usuários simultaneamente</div>"+
                        "</li>"+
                        "<li class=\"dd-item\" data-id=\"9\">"+
                        "<div class=\"dd-handle\">Um usuário pode pertencer a mais de um grupo</div>"+
                        "</li>"+
                        "<li class=\"dd-item\" data-id=\"10\">"+
                        "<div class=\"dd-handle\">Cada um dos grupos de usuário terá uma visibilidade diferente da ferramenta</div>"+
                        "</li> "+
                        "<li class=\"dd-item\" data-id=\"11\">"+
                        "<div class=\"dd-handle\">O módulo financeiro do sistema armazena informações do dia a dia da empresa</div>"+
                        "</li> "+
                    "</ol>"+
                "</div>"+
              "</div>"+
              "<input type='button' id='tryButton' value='Enviar ao Rodolfo'/>");
            
            $('#nestable2 > .dd-list').randomize('li');

            // activate Nestable for list 1
            $('#nestable').nestable({
                group: 1
            });
            
            // activate Nestable for list 2
            $('#nestable2').nestable({
                group: 1
            });

            self = this;
            $("#tryButton").click(function() {
                if (self.evaluateQuantitativeGoals()) {
                    
                    // return to map
                    self.onDestroyEvent();
                    
                    // return to menu
                    me.state.set(me.state.MENU, new game.MainMenu());
                    me.state.change(me.state.MENU);
                }
            });
        },

        evaluateQuantitativeGoals: function() {
            var classifiedList = $('#nestable').nestable('serialize');
            var requirementsList = $('#nestable2').nestable('serialize');
            var requirementListSize = 6;
            var rFirstID = 4;
            var badRequirimentListSize = 2;
            var bFirstID = rFirstID + requirementListSize;
            var correct = false;
            
            if (requirementsList.length == 0) {
                correct = true;

                if (classifiedList[0].children && classifiedList[0].children.length == requirementListSize) {
                  for (var i = classifiedList[0].children.length - 1; i >= 0; i--) {
                    if (classifiedList[0].children[i].id < rFirstID || 
                      classifiedList[0].children[i].id >= (rFirstID + requirementListSize)){
                        console.log(classifiedList[0].children[i].id);
                        correct = false;
                        break;
                    }
                  };
                } else {
                  correct = false;
                }

                if (classifiedList[1].children && classifiedList[1].children.length == badRequirimentListSize) {
                  for (var i = classifiedList[1].children.length - 1; i >= 0; i--) {
                    if (classifiedList[1].children[i].id < bFirstID || 
                      classifiedList[1].children[i].id >= (bFirstID + badRequirimentListSize)){
                        console.log(classifiedList[1].children[i].id);
                        correct = false;
                        break;
                    }
                  };
                } else {
                  correct = false;
                }
            }

            if (correct == true) {
                alert("Bom trabalho, a equipe de requisitos agora deve fazer a parte dela! O líder do time de desenvolvimento quer sua opinião, encontre-o e descubra o que ele quer.");
                self.finished = true;
                return true;
            };

            alert("O Rodolfo não gostou da sua alocação, mas você é novo na empresa, e ele resolveu te dar outra chance. Aproveite-a! ");
            return false;
        },

        

    }),
};
