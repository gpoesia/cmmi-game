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
            me.levelDirector.loadLevel("map_level_3");
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
            console.log("Resetting level 3.1");
            HideMelonJS();
            $("#game").append("<div id='level31'></div>");
            this.play();
        },

        onDestroyEvent: function() {
            $("#level31").replaceWith("");
            ShowMelonJS();
        },


        play: function() {
            $("#level31").append("<p>Você, nosso mais novo estagiário de desenvolvimento, tem de ajudar o nosso especialista em requisitos, o Rodolfo."+" Nosso último estagiário misturou os requisitos que tinham de voltar pra prancheta com os prontos para implementação, precisamos que você os reorganize e submeta para aprovação do chefe!");
            $("#level31").append("<div class=\"cf nestable-lists\">" +
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
                    // me.state.set(me.state.MENU, new game.MainMenu());
                    // me.state.change(me.state.MENU);
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

    MiniGame2: me.ScreenObject.extend({
        init: function() {
            self.finished = false;
        },

        isFinished: function() {
            return self.finished;
        },

        onResetEvent: function() {
            console.log("Resetting level 3.2");
            HideMelonJS();
            $("#game").append("<div id='level32'></div>");
            this.play();
        },

        onDestroyEvent: function() {
            ShowMelonJS();
            $("#level32").replaceWith("");
        },

        play: function() {
            $("#level32").append(
                "<div class=\"containment-wrapper\">"+
                    "<div id=\"funcionarios_container\" class=\"funcionarios droppable\">"+
                    "<h3>Funcionários</h3>"+
                    "</div>"+
                    "<div id=\"clientes_container\" class=\"clientes droppable\">"+
                    "<h3>Clientes</h3>"+
                    "</div>"+
                    "<div id=\"front_end_container\" class=\"front_end droppable\">"+
                    "<h3>Front End</h3>"+
                    "</div>"+
                    "<div id=\"financeiro_container\" class=\"financeiro droppable\">"+
                    "<h3>Financeiro</h3>"+
                    "</div>"+
                "</div>"+
                "<br style=\"clear:both\" />"+
                "<div id=\"droppable_container\" class=\"snappable droppable\">"+
                    "<div id=\"database_1\" class=\"my_image db_image draggable\">"+
                        "<img src=\"images/level3/database.png\" />"+
                    "</div>"+
                    "<div id=\"database_2\" class=\"my_image db_image draggable\">"+
                        "<img src=\"images/level3/database.png\" />"+
                    "</div>"+
                    "<div id=\"database_3\" class=\"my_image db_image draggable\">"+
                        "<img src=\"images/level3/database.png\" />"+
                    "</div>"+
                    "<div id=\"database_4\" class=\"my_image db_image draggable\">"+
                        "<img src=\"images/level3/database.png\" />"+
                    "</div>"+
                    "<div id=\"database_5\" class=\"my_image db_image draggable\">"+
                        "<img src=\"images/level3/database.png\" />"+
                    "</div>"+
                    "<div id=\"database_6\" class=\"my_image db_image draggable\">"+
                        "<img src=\"images/level3/database.png\" />"+
                    "</div>"+
                    "<div id=\"database_7\" class=\"my_image db_image draggable\">"+
                        "<img src=\"images/level3/database.png\" />"+
                    "</div>"+
                    "<div id=\"controller_1\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/controller.png\" />"+
                    "</div>"+
                    "<div id=\"controller_2\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/controller.png\" />"+
                    "</div>"+
                    "<div id=\"controller_3\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/controller.png\" />"+
                    "</div>"+
                    "<div id=\"controller_4\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/controller.png\" />"+
                    "</div>"+
                    "<div id=\"controller_5\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/controller.png\" />"+
                    "</div>"+
                    "<div id=\"usr_1\" class=\"my_image usr_image draggable\">"+
                        "<img src=\"images/level3/users.png\" />"+
                    "</div>"+
                    "<div id=\"usr_2\" class=\"my_image usr_image draggable\">"+
                        "<img src=\"images/level3/users.png\" />"+
                    "</div>"+
                    "<div id=\"usr_3\" class=\"my_image usr_image draggable\">"+
                        "<img src=\"images/level3/users.png\" />"+
                    "</div>"+
                    "<div id=\"interface_1\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/boundary.png\" />"+
                    "</div>"+
                    "<div id=\"interface_2\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/boundary.png\" />"+
                    "</div>"+
                    "<div id=\"interface_3\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/boundary.png\" />"+
                    "</div>"+
                    "<div id=\"interface_4\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/boundary.png\" />"+
                    "</div>"+
                    "<div id=\"layout_1\" class=\"my_image layout_image draggable\">"+
                        "<img src=\"images/level3/layout.png\" />"+
                    "</div>"+
                    "<div id=\"interface_5\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/boundary.png\" />"+
                    "</div>"+
                    "<div id=\"interface_6\" class=\"my_image controller_image draggable\">"+
                        "<img src=\"images/level3/boundary.png\" />"+
                    "</div>"+
                "</div>"+
                "<br style=\"clear:both\" />"+
                "<input type=\"submit\" id='tryButton' value=\"Avaliar alocação\">"+
                "<br style=\"clear:both\" />"+
                "<div class=\"legenda\">"+
                    "<div id=\"usrs\" class=\"my_image usr_image draggable\">"+
                        "<h2>Usuários</h2>"+
                        "<img src=\"images/level3/users.png\" />"+
                    "</div>"+
                    "<div id=\"controllers\" class=\"my_image controller_image draggable\">"+
                        "<h2>Controladores</h2>"+
                        "<img src=\"images/level3/controller.png\" />"+
                    "</div>"+
                    "<div id=\"databases\" class=\"my_image db_image draggable\">"+
                        "<h2>     Bancos de Dados</h2>"+
                        "<img src=\"images/level3/database.png\" />"+
                    "</div>"+
                    "<div id=\"interfaces\" class=\"my_image controller_image draggable\">"+
                        "<h2>Interface lógica</h2>"+
                        "<img src=\"images/level3/boundary.png\" />"+
                    "</div>"+
                    "<div id=\"layouts\" class=\"my_image layout_image draggable\">"+
                        "<h2>Interface gráfica</h2>"+
                        "<img src=\"images/level3/layout.png\" />"+
                    "</div>"+
                "</div>"
            );
            var dropped = false;
        
            $( "#database_1" ).data("dropped_at", "droppable_container").data("type", "db").draggable({ snap: ".droppable"});
            $( "#database_2" ).data("dropped_at", "droppable_container").data("type", "db").draggable({ snap: ".droppable"});
            $( "#database_3" ).data("dropped_at", "droppable_container").data("type", "db").draggable({ snap: ".droppable"});
            $( "#database_4" ).data("dropped_at", "droppable_container").data("type", "db").draggable({ snap: ".droppable"});
            $( "#database_5" ).data("dropped_at", "droppable_container").data("type", "db").draggable({ snap: ".droppable"});
            $( "#database_6" ).data("dropped_at", "droppable_container").data("type", "db").draggable({ snap: ".droppable"});
            $( "#database_7" ).data("dropped_at", "droppable_container").data("type", "db").draggable({ snap: ".droppable"});
            $( "#controller_1" ).data("dropped_at", "droppable_container").data("type", "controller").draggable({ snap: ".droppable"});
            $( "#controller_2" ).data("dropped_at", "droppable_container").data("type", "controller").draggable({ snap: ".droppable"});
            $( "#controller_3" ).data("dropped_at", "droppable_container").data("type", "controller").draggable({ snap: ".droppable"});
            $( "#controller_4" ).data("dropped_at", "droppable_container").data("type", "controller").draggable({ snap: ".droppable"});
            $( "#controller_5" ).data("dropped_at", "droppable_container").data("type", "controller").draggable({ snap: ".droppable"});
            $( "#usr_1" ).data("dropped_at", "droppable_container").data("type", "user").draggable({ snap: ".droppable"});
            $( "#usr_2" ).data("dropped_at", "droppable_container").data("type", "user").draggable({ snap: ".droppable"});
            $( "#usr_3" ).data("dropped_at", "droppable_container").data("type", "user").draggable({ snap: ".droppable"});
            $( "#interface_1" ).data("dropped_at", "droppable_container").data("type", "interface").draggable({ snap: ".droppable"});
            $( "#interface_2" ).data("dropped_at", "droppable_container").data("type", "interface").draggable({ snap: ".droppable"});
            $( "#interface_3" ).data("dropped_at", "droppable_container").data("type", "interface").draggable({ snap: ".droppable"});
            $( "#interface_4" ).data("dropped_at", "droppable_container").data("type", "interface").draggable({ snap: ".droppable"});
            $( "#interface_5" ).data("dropped_at", "droppable_container").data("type", "interface").draggable({ snap: ".droppable"});
            $( "#interface_6" ).data("dropped_at", "droppable_container").data("type", "interface").draggable({ snap: ".droppable"});
            $( "#layout_1" ).data("dropped_at", "droppable_container").data("type", "layout").draggable({ snap: ".droppable"});

            $( "#clientes_container" ).data("draggables", [0, 0, 0, 0, 0]).droppable({
            accept: '.my_image',
                //activeClass: "ui-state-hover",
                //hoverClass: "ui-state-hightlight",
                    drop: function(event, ui) {
                        if($(ui.draggable).data("type") == "db") {
                            $(this).data("draggables")[0]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[0]--;
                        }
                        else if($(ui.draggable).data("type") == "controller") {
                            $(this).data("draggables")[1]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[1]--;
                        }
                        else if($(ui.draggable).data("type") == "user") {
                            $(this).data("draggables")[2]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[2]--;
                        }
                        else if($(ui.draggable).data("type") == "interface") {
                            $(this).data("draggables")[3]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[3]--;
                        }
                        else if($(ui.draggable).data("type") == "layout") {
                            $(this).data("draggables")[4]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[4]--;
                        }
                        
                        $(ui.draggable).data("dropped_at", $(this).attr('id'));
                    }
                }
            );

            $( "#funcionarios_container" ).data("draggables", [0, 0, 0, 0, 0]).droppable({
                accept: '.my_image',
                //activeClass: "ui-state-hover",
                //hoverClass: "ui-state-hightlight",
                    drop: function(event, ui) {
                        if($(ui.draggable).data("type") == "db") {
                            $(this).data("draggables")[0]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[0]--;
                        }
                        else if($(ui.draggable).data("type") == "controller") {
                            $(this).data("draggables")[1]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[1]--;
                        }
                        else if($(ui.draggable).data("type") == "user") {
                            $(this).data("draggables")[2]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[2]--;
                        }
                        else if($(ui.draggable).data("type") == "interface") {
                            $(this).data("draggables")[3]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[3]--;
                        }
                        else if($(ui.draggable).data("type") == "layout") {
                            $(this).data("draggables")[4]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[4]--;
                        }
                        $(ui.draggable).data("dropped_at", $(this).attr('id'));
                        
                        
                    }
                }
            );
            
            $( "#financeiro_container" ).data("draggables", [0, 0, 0, 0, 0]).droppable({
                accept: '.my_image',
                //activeClass: "ui-state-hover",
                //hoverClass: "ui-state-hightlight",
                    drop: function(event, ui) {
                        if($(ui.draggable).data("type") == "db") {
                            $(this).data("draggables")[0]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[0]--;
                        }
                        else if($(ui.draggable).data("type") == "controller") {
                            $(this).data("draggables")[1]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[1]--;
                        }
                        else if($(ui.draggable).data("type") == "user") {
                            $(this).data("draggables")[2]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[2]--;
                        }
                        else if($(ui.draggable).data("type") == "interface") {
                            $(this).data("draggables")[3]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[3]--;
                        }
                        else if($(ui.draggable).data("type") == "layout") {
                            $(this).data("draggables")[4]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[4]--;
                        }
                        $(ui.draggable).data("dropped_at", $(this).attr('id'));
                        
                    }
                }
            );
            
            
            $( "#front_end_container" ).data("draggables", [0, 0, 0, 0, 0]).droppable({
                accept: '.my_image',
                //activeClass: "ui-state-hover",
                //hoverClass: "ui-state-hightlight",
                    drop: function(event, ui) {
                        if($(ui.draggable).data("type") == "db") {
                            $(this).data("draggables")[0]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[0]--;
                        }
                        else if($(ui.draggable).data("type") == "controller") {
                            $(this).data("draggables")[1]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[1]--;
                        }
                        else if($(ui.draggable).data("type") == "user") {
                            $(this).data("draggables")[2]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[2]--;
                        }
                        else if($(ui.draggable).data("type") == "interface") {
                            $(this).data("draggables")[3]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[3]--;
                        }
                        else if($(ui.draggable).data("type") == "layout") {
                            $(this).data("draggables")[4]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[4]--;
                        }
                        $(ui.draggable).data("dropped_at", $(this).attr('id'));
                        
                    }
                }
            );
            
            $( "#droppable_container" ).data("draggables", [7, 5, 3, 6, 1]).droppable({
                accept: '.my_image',
                //activeClass: "ui-state-hover",
                //hoverClass: "ui-state-hightlight",
                    drop: function(event, ui) {
                        if($(ui.draggable).data("type") == "db") {
                            $(this).data("draggables")[0]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[0]--;
                        }
                        else if($(ui.draggable).data("type") == "controller") {
                            $(this).data("draggables")[1]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[1]--;
                        }
                        else if($(ui.draggable).data("type") == "user") {
                            $(this).data("draggables")[2]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[2]--;
                        }
                        else if($(ui.draggable).data("type") == "interface") {
                            $(this).data("draggables")[3]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[3]--;
                        }
                        else if($(ui.draggable).data("type") == "layout") {
                            $(this).data("draggables")[4]++;
                            $("#"+$(ui.draggable).data("dropped_at")).data("draggables")[4]--;
                        }
                        $(ui.draggable).data("dropped_at", $(this).attr('id'));
                        
                    }
                }
            );
            
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
            var alert_string = "";
            var correct = true;
            if($("#clientes_container").data("draggables")[0] !== 1 || $("#funcionarios_container").data("draggables")[0] !== 1 || $("#financeiro_container").data("draggables")[0] !== 1 || $("#front_end_container").data("draggables")[0] !== 0) {
                alert_string = alert_string + "Você não alocou os bancos de dados corretamente!\n";
                correct = false;
            }
            else {
                alert_string = alert_string + "Os bancos de dados estão certos!\n";
            }
            if($("#clientes_container").data("draggables")[1] !== 1 || $("#funcionarios_container").data("draggables")[1] !== 1 || $("#financeiro_container").data("draggables")[1] !== 1 || $("#front_end_container").data("draggables")[1] !== 0) {
                alert_string = alert_string + "Você não alocou os controladores corretamente!\n";
                correct = false;
            }
            else {
                alert_string = alert_string + "Os controladores estão certos!\n";
            }
            if($("#clientes_container").data("draggables")[2] !== 0 || $("#funcionarios_container").data("draggables")[2] !== 1 || $("#financeiro_container").data("draggables")[2] !== 0 || $("#front_end_container").data("draggables")[2] !== 0) {
                alert_string = alert_string + "Você não alocou os usuários corretamente!\n";
                correct = false;
            }
            else {
                alert_string = alert_string + "Os usuários estão certos!\n";
            }
            if($("#clientes_container").data("draggables")[3] !== 1 || $("#funcionarios_container").data("draggables")[3] !== 1 || $("#financeiro_container").data("draggables")[3] !== 1 || $("#front_end_container").data("draggables")[3] !== 0) {
                alert_string = alert_string + "Você não alocou as interfaces lógicas corretamente, como os módulos vão se comunicar!?\n";
                correct = false;
            }
            else {
                alert_string = alert_string + "As interfaces lógicas estão certas!\n";
            }
            if($("#clientes_container").data("draggables")[4] !== 0 || $("#funcionarios_container").data("draggables")[4] !== 0 || $("#financeiro_container").data("draggables")[4] !== 0 || $("#front_end_container").data("draggables")[4] !== 1) {
                alert_string = alert_string + "Você não alocou a interface gráfica corretamente, o cliente não sabe usar o terminal!\n";
                correct = false;
            }
            else {
                alert_string = alert_string + "A interface gráfica está certa!\n";
            }
            alert(alert_string);

            return correct;
        },
    }),
};
