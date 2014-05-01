// CMMI Game Level 4 - 2 mini-games

function HideMelonJS() {
    $("#screen").css("display", "none");
}

function ShowMelonJS() {
    $("#screen").css("display", "inline");
}

function Clear(divId) {
    $("#" + divId).html("");
}

var sequentialElementId = 0;

function ShowTextSlowly(elementId, text, interval) {
    var index = 0;

    function addCharacter() {
        index += 1;
        $("#" + elementId).text(text.substr(0, index));

        if (index < text.length) {
            window.setTimeout(addCharacter, interval);
        }
    }

    addCharacter();
}

function AddText(divId, text) {
    sequentialElementId++;
    $("#" + divId).append("<p class='message' id='p" + sequentialElementId + "'></p>");
    ShowTextSlowly("p" + sequentialElementId, text, 100);
}

function ShowPrologue(divId, messagesList, callback) {
    $("#" + divId).append("<p class='message' id='prologueText'></p>",
            "<input class='button bottom' id='prologueButton' type='button' value='Próximo'/>",
            "<input class='button bottom' id='skipButton' type='button' value='Pular'/>");

    var nextMessage = 0;

    function Skip() {
        $("#prologueText").replaceWith("");
        $("#prologueButton").replaceWith("");
        $("#skipButton").replaceWith("");
        callback();
    }

    function Advance() {
        if (nextMessage === messagesList.length) {
            Skip();
        } else {
            ShowTextSlowly("prologueText", messagesList[nextMessage], 30);
            nextMessage++;
        }
    }

    Advance();
    $("#prologueButton").click(Advance);
    $("#skipButton").click(Skip);
}

function watchSliderValue(id, paragraphId, suffix) {
    function eventHandler() {
        $(paragraphId).html($(id).slider("value") + suffix);
    }

    $(id).on("slidechange", eventHandler);
    $(id).slider("option", "value", $(id).slider("option", "min"));
}


game.Level4 = {

    MiniGame1Messages:  ["Conseguir a certificação nível 4 do CMMI não é fácil. " +
                            "Será necessário fazer algumas mudanças em sua empresa...",
                         "É preciso definir metas quantitativas para os projetos de software. " +
                            "Ou seja, metas que podem ser medidas de forma precisa e que tenham significado claro.",
                         "Por exemplo, a meta \"O projeto deve ser barato\" não é quantitativa. " +
                             "Já a meta \"O projeto não pode ter mais de 50 bugs por mil linhas de código cadastrados no bug tracker\" " +
                             "é quantitativa e precisa: ao final do projeto, basta contar o número total de linhas de código do software " +
                             "e o número de bugs cadastrados no bug tracker para saber se a meta foi atingida ou não.",
                         "É hora de definir metas para seus projetos para atender à Meta Específica SG1 do CMMI nível 4, " +
                             "\"Prepare for Quantitative Management\", da área de processo \"Quantitative Project Management\". " +
                             "Isto será feito da seguinte forma: você será apresentado a cinco métricas quantitativas para as "+
                             "quais deverá definir os valores que serão usados pelos projetos como metas. Depois de definidas, " +
                             "as metas serão usadas por um projeto de software da sua empresa. Se as metas não forem realistas, " +
                             "o projeto falhará por não ter alcançado as metas. Por outro lado, se elas forem relaxadas demais, " +
                             "os projetos atenderão às metas e falharão mesmo assim, por insatisfação do cliente pelo software " +
                             "recebido.",
                         "Seu objetivo, então, é definir metas realistas e que possibilitem que o desenvolvimento se oriente " +
                             "para o desenvolvimento de software de qualidade, que atenda aos objetivos tanto do cliente quanto " +
                             "da sua empresa. Preparado?"],

    MiniGame1: me.ScreenObject.extend({
        init: function() {
        },

        onResetEvent: function() {
            console.log("Resetting level 4.");
            HideMelonJS();
            $("#game").append("<div id='level4'></div>");
            self = this;
            ShowPrologue("level4", game.Level4.MiniGame1Messages, function() { self.play(); });
        },

        onDestroyEvent: function() {
            ShowMelonJS();
            $("#level4").replaceWith("");
        },


        play: function() {
            $("#level4").append("<p>Escolha os valores que sua empresa usará no próximo projeto" +
               " como metas quantitativas para as métricas abaixo. Para isto, basta clicar " +
               "na barra no valor desejado..</p>",
               "<p>Número máximo de bugs por ponto de função: <p id='bp'></p><div id='slider_bp'></div></p>",
               "<p>Fração mínima do código coberta por testes automatizados: <p id='cc'></p><div id='slider_cc'></div></p>",
               "<p>Fração mínima do código revisada por um desenvolvedor que não escreveu o código: <p id='cr'></p><div id='slider_cr'></div></p>",
               "<p>Máximo de horas por ponto de função: <p id='hp'></p><div id='slider_hp'></div></p>",
               "<p>Fração máxima dos requisitos que precisaram de revisão durante o projeto: <p id='rr'></p><div id='slider_rr'></div></p>",
               "<input type='button' id='tryButton' value='Usar metas'/>");

            $("#slider_bp").slider({max: 10, min: 0, animate: "slow"});
            $("#slider_cc").slider({max: 100, min: 0, animate: "slow"});
            $("#slider_cr").slider({max: 100, min: 0, animate: "slow"});
            $("#slider_hp").slider({max: 200, min:0, animate: "slow"});
            $("#slider_rr").slider({max: 100, min:0, animate: "slow"});

            watchSliderValue("#slider_bp", "#bp", " bug(s)");
            watchSliderValue("#slider_cc", "#cc", "% do código");
            watchSliderValue("#slider_cr", "#cr", "% do código");
            watchSliderValue("#slider_hp", "#hp", " hora(s)");
            watchSliderValue("#slider_rr", "#rr", "% dos requisitos");

            self = this;
            $("#tryButton").click(function() {
                if (self.evaluateQuantitativeGoals()) {
                    me.state.change(me.state.MENU);
                }
            });
        },

        evaluateQuantitativeGoals: function() {
            bugsPerFP = $("#slider_bp").slider("option", "value");
            testCodeCoverage = $("#slider_cc").slider("option", "value");
            reviewCodeCoverage = $("#slider_cr").slider("option", "value");
            hoursPerFP = $("#slider_hp").slider("option", "value");
            requirementsChanged = $("#slider_rr").slider("option", "value");

            if (Math.random() < 0.9 && bugsPerFP < 3) {
                alert("Que pena... Seus programadores normalmente erram mais de " + bugsPerFP +
                        " vez" + (bugsPerFP < 2 ? "" : "es") +
                        " por ponto de função. Assim, ficaram com muito medo de submeter código " +
                        " e o projeto foi atrasado por isso. Tente novamente.");
            } else if (Math.random() < 0.7 && bugsPerFP > 7) {
                alert("Seus programadores pensaram que, podendo cometer até " + bugsPerFP +
                        " bugs em cada ponto de função, poderiam se passar por " +
                        " produtivos submetendo código várias vezes ao dia. Porém, com tamanha " +
                        " falta de cuidado, os bugs foram acumulando e o final do projeto foi " +
                        " um caos... Tente novamente com outras metas.");
            } else if (Math.random() < 0.5 && testCodeCoverage > 95) {
                alert("Os desenvolvedores ficaram responsáveis por escrever testes para pelo menos " +
                        testCodeCoverage + "% do código da aplicação. Mas isto tomou tempo demais!" +
                        " O cliente queria ver seu software funcionando, mas você só entregou o produto" +
                        " depois de que houvessem testes para os testes dos testes! Com isso, o projeto" +
                        " não terminou como você gostaria... É melhor rever suas metas.");
            } else if (Math.random() < 0.8 && testCodeCoverage < 20) {
                alert("Você praticamente isentou seus desenvolvedores de escreverem testes " +
                        "automatizados, não é? Isto não foi prudente. Vários bugs que atrasaram o projeto" +
                        " poderiam ter sido detectados por testes feitos mais cedo. Tente outra vez.");
            } else if (Math.random() > testCodeCoverage / 100) {
                alert("Seus testes automatizados foram um sucesso. Ou quase. O problema estava nos " +
                        (100 - testCodeCoverage) + "% do código não testado. Lá estava ele, o maior bug " +
                        "que sua empresa já viu. Foram " + Math.floor((100 - testCodeCoverage) / 3.4) + " dias " +
                        "de atraso por causa dele. Melhor rever isto.");
            } else if (Math.random() > reviewCodeCoverage / 100) {
                alert("Às vezes a sorte está do nosso lado. Às vezes não. Os testes automatizados não " +
                        " detectaram um bug, que por azar estava nos " +
                        (100 - testCodeCoverage) + "% do código não revisado por um desenvolvedor fora " +
                        "o próprio autor. Lá estava ele, o maior bug " +
                        "que sua empresa já viu. Foram " + Math.floor((100 - reviewCodeCoverage) / 2.3)  + " dias " +
                        "de atraso por causa dele. Nunca mais subestime a revisão de código.");
            } else if (Math.random() < 0.75 && hoursPerFP > 10) {
                alert("Pelo visto, você é uma pessoa bastante generosa. Seus desenvolvedores ficaram felizes " +
                        "por terem " + hoursPerFP + " horas por ponto de função para implementarem o software. " +
                        "Mas seu cliente não é tão generoso assim, e está bravo porque queria o produto " +
                        "ontem! E você nem sabe que dia irá acabar. Às vezes, é preciso der um pouco duro...");
            } else if (Math.random() < 0.75 && hoursPerFP < 3) {
                alert("Você bem que tentou, mas não conseguiu transformar seus desenvolvedores em ninjas." +
                        " E assim, eles não implementaram as funcionalidades em " + hoursPerFP + " horas" +
                        " por ponto de função. Com isto, de acordo com as metas estabelecidas, o projeto " +
                        "foi um fracasso. Além disso, com tanto stress da equipe, você precisou dar uma " +
                        "semana de férias para todos. Que desastre...");
            } else if (Math.random() / 2 > requirementsChanged) {
                alert("Seus analistas bem que tentaram. Mas é muito difícil entender o cliente, e eles " +
                        "precisaram de reuniões demais para conseguirem definir os requisitos de forma " +
                        "que menos de " + requirementsChanged + "% deles precisassem ser alterados. Mas " +
                        "o cliente reclamou do tempo que levou para entrarem em acordo sobre os requisitos, " +
                        "e isto impactou negativamente a imagem da empresa. Melhor mudar as metas - e o " +
                        "cliente, que já disse que não quer mais te contratar.");
            } else {
                alert("Excelente! Seu projeto foi um sucesso! As metas garantiram que o produto tivesse " +
                        "qualidade suficiente para ser aprovado pelo cliente e que tudo corresse dentro do " +
                        "prazo combinado. Sua empresa já atingiu a meta do CMMI nível 4 " +
                        "'Establish Performance Baselines and Models'. Parabéns!");
                return true;
            }

            return false;
        },

    }),
};

