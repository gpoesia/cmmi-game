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
            "<input class='button bottom' id='prologueButton' type='button' value='Próximo'/>");

    var nextMessage = 0;

    function Advance() {
        if (nextMessage === messagesList.length) {
            $("#prologueText").replaceWith("");
            $("#prologueButton").replaceWith("");
            callback();
        } else {
            ShowTextSlowly("prologueText", messagesList[nextMessage], 30);
            nextMessage++;

        }
    }

    Advance();
    $("#prologueButton").click(Advance);
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
            ShowPrologue("level4", game.Level4.MiniGame1Messages,
                function() { alert("TODO"); } );
        },

        onDestroyEvent: function() {
            ShowMelonJS();
        }
    }),
};

