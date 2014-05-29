var DIALOGUES = {
	girl: {		
		"actors": [ {
			"id": 10,
			"name": "hero"
		}, {
			"id": 20,
			"name": "girl"
		} ],
		"dialogues": [ {
			"id": 10,
			"parent": null,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Olá, seja bem vindo!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ 20 ]
		}, {
			"id": 20,
			"parent": 10,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Nosso último estagiário sabotou nosso mais recente projeto!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ 30 ]
		}, {
			"id": 30,
			"parent": 20,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Te contratamos para resolver alguns problemas que ele causou para nós.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ 60 ]
		}, {
			"id": 40,
			"parent": 30,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Sua primeira tarefa é auxiliar nosso Gerente de Requisitos, o Rodolfo.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ 50 ]
		}, {
			"id": 50,
			"parent": 40,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Ele não fala muito, mas vai te passar uma descrição do que deve ser feito.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [60]
		}, {
			"id": 60,
			"parent": 30,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Mas antes, os outros integrantes da equipe tem algo para falar com você, procure-os para saber mais sobre o funcionamento da nossa empresa.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": []
		}],
		
	},
	girl1: {		
		"actors": [ {
			"id": 10,
			"name": "hero"
		}, {
			"id": 20,
			"name": "girl"
		} ],
		"dialogues": [ {
			"id": 10,
			"parent": null,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Olá! Estou imprimindo alguns relatórios sobre projetos anteriores para o Rodolfo.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ 20 ]
		}, {
			"id": 20,
			"parent": 10,
			"isChoice": false,
			"actor": 10,
			"conversant": 10,
			"menuText": "",
			"dialogueText": "Você é o novo estagiário! Deixe-me explicar algumas das nossas estratégias de gestão.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ 30 ]
		}, {
			"id": 30,
			"parent": 20,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Um dos primeiros problemas que tivemos nas tentativas de Integração de Produtos foi a discrepância apresentada pelas equipes.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ 40 ]
		}, {
			"id": 40,
			"parent": 30,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Cada uma tinha suas próprias ideias de como implemenar todo o projeto, e isso gerava implementações muito desiguais de cada módulo.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ 50 ]
		}, {
			"id": 50,
			"parent": 40,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Para isso passamos a adotar processos para gerenciar todo o desenvolvimento de um produto, além de padronizar qual processo de desenvolvimento será usado.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [60]
		}, {
			"id": 60,
			"parent": 50,
			"isChoice": false,
			"actor": 10,
			"conversant": 10,
			"menuText": "",
			"dialogueText": "Ao mesmo tempo, mantemos todas as equipes sincronizadas para que os gargalos de implementação sejam minimizados.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [70]
		}, {
			"id": 70,
			"parent": 60,
			"isChoice": false,
			"actor": 10,
			"conversant": 10,
			"menuText": "",
			"dialogueText": "Outra medida central para nosso sucesso foi resultado de um controle de riscos muito mais eficiente.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [80 ]
		}, {
			"id": 80,
			"parent": 70,
			"isChoice": false,
			"actor": 10,
			"conversant": 10,
			"menuText": "",
			"dialogueText": "Com ele, conseguimos identificar, entender e mitigar os principais riscos ao bom andamento do projeto, reduzindo o tempo gasto com a resolução de problemas durante o desenvolvimento.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [90]
		}, {
			"id": 90,
			"parent": 80,
			"isChoice": false,
			"actor": 10,
			"conversant": 10,
			"menuText": "",
			"dialogueText": "Por fim, a estruturação proveniente de nossas medidas gerenciais permite tomadas de decisões muito mais rápidas.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [100]
		}, {
			"id": 100,
			"parent": 90,
			"isChoice": false,
			"actor": 10,
			"conversant": 10,
			"menuText": "",
			"dialogueText": "A equipe gestora consegue avaliar muito mais caminhos alternativos para o projeto, já que os processos aumentam a predictibilidade do projeto.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [110]
		}, {
			"id": 110,
			"parent": 100,
			"isChoice": false,
			"actor": 10,
			"conversant": 10,
			"menuText": "",
			"dialogueText": "Muito bem! Agora converse com o lider do time de desenvolvimento, ele vai te colocar a par da situação atual e te atribuir algumas tarefas. Ao trabalho!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		} ],
		
	},
	girl2: {		
		"actors": [ {
			"id": 10,
			"name": "hero"
		}, {
			"id": 20,
			"name": "girl"
		} ],
		"dialogues": [ {
			"id": 10,
			"parent": null,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Olá, Estagiário. Eu sou a coordenadora da Garantia de Qualidade do nosso projeto.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [20]
		}, {
			"id": 20,
			"parent": 10,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Um dos passos da Qualidade é a Verificação.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [30]
		}, {
			"id": 30,
			"parent": 20,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Nessa etapa, utilizamos metodologias para desenvolvermos atividades ligadas ao cumprimento de requisitos.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [40]
		}, {
			"id": 40,
			"parent": 30,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Primeiramente escolhemos os frutos de nosso trabalho que iremos inspecionar e quais pares serão responsáveis pela verificação.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [50]
		}, {
			"id": 50,
			"parent": 40,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Os verificadores devem conduzir revisões detalhadas e reportar todos os problemas que foram encontrados, a fim de refatorar e corrigir os falhas posteriormente.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [60]
		}, {
			"id": 60,
			"parent": 50,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Por fim, executamos a chamada Validação.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [70]
		}, {
			"id": 70,
			"parent": 60,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Nessa última fase, garantimos o funcionamento correto do produto e seus componentes, mediante ao ambiente que ele será empregado.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [80]
		}, {
			"id": 80,
			"parent": 70,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Ao final desses processos, temos um produto que atende ao que foi requisitado e funciona corretamente.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [90]
		}, {
			"id": 90,
			"parent": 80,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Poucas empresas chegam a esse nível de comprometimento, esse é um dos nossos diferenciais!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [100]
		}, {
			"id": 100,
			"parent": 90,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Um dos nossos programadores deveria te explicar as questões relacionadas à importância do uso de processos.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [110]
		}, {
			"id": 110,
			"parent": 100,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Não me lembro quem era, mas você deveria encontrá-lo assim que possível. Bom trabalho!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": []
		}],
	},
	prog1: {		
		"actors": [ {
			"id": 10,
			"name": "hero"
		}, {
			"id": 20,
			"name": "girl"
		} ],
		"dialogues": [ {
			"id": 10,
			"parent": null,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Estagiário, agora que você já sabe sobre algumas de nossas práticas, é hora de entrar para a equipe.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [20]
		}, {
			"id": 20,
			"parent": 10,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Como você deve ter ouvido falar, nosso estagiário anterior sabotou nosso projeto, e não vamos conseguir nenhuma extensão de prazo com o cliente.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [30]
		}, {
			"id": 30,
			"parent": 20,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "O projeto consiste em um sistema de controle de uma pizzaria. Alguns dos requisitos do cliente já são sabidos. ",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [40]
		}, {
			"id": 40,
			"parent": 30,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "O cliente gostaria que seus funcionários pudessem realizar tarefas do cotidiano por meio de um sistema informatizado.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [60]
		}, {
			"id": 60,
			"parent": 50,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Seus entregadores devem ser capazes de informar, rapidamente, que a entrega foi feita, enquanto quem trabalha no caixa deve registrar pedidos e o valor recebido de cada pagamento.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [70]
		}, {
			"id": 70,
			"parent": 60,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "As informações pertinentes aos clientes, funcionários e atividades financeiras devem estar completamente separadas umas das outras.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [80]
		}, {
			"id": 80,
			"parent": 70,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "O nosso Gerente de Requisitos, o Rodolfo, tem uma lista completa de requisitos para você classificar. Converse com ele assim que possível!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [90]
		}, {
			"id": 90,
			"parent": 80,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Quando tiver terminado, nosso desenhista precisa de sua ajuda para determinar quais componentes serão usados em nos módulos.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [100]
		}, {
			"id": 100,
			"parent": 90,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Essas tarefas fazem parte de algumas das principais atividades de desenvolvimento: levantamento de requisitos e soluções técnicas.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [110]
		}, {
			"id": 110,
			"parent": 100,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Todos os membros da equipe estão dispostos a lhe contar os aspectos da nossa organização novamente, basta conversar com eles. Boa sorte!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": []
		}],
	},
	prog2: {		
		"actors": [ {
			"id": 10,
			"name": "hero"
		}, {
			"id": 20,
			"name": "girl"
		} ],
		"dialogues": [ {
			"id": 10,
			"parent": null,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Estagiário, nossa organização não alcançou o terceiro nivel de maturidade por meio do caos.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [20]
		}, {
			"id": 20,
			"parent": 10,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "A implantação de processos em todos os nossos setores foi fundamental para o nosso avanço.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [30]
		}, {
			"id": 30,
			"parent": 20,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Por meio de metodologias consolidadas aumentamos nossa produtividade e qualidade, permitindo a realização de projetos maiores e mais complexos.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [40]
		}, {
			"id": 40,
			"parent": 30,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Sem os processos implantados, nossa capacidade de estimar prazos e custos era horrível!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [50]
		}, {
			"id": 50,
			"parent": 40,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Vários projetos simples se tornaram fracassos totais devido à desorganização de desenvolvimento e gestão.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [60]
		}, {
			"id": 60,
			"parent": 50,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Mas simplesmente instaurarmos processos aleatoriamente, claro, não foi o suficiente!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [70]
		}, {
			"id": 70,
			"parent": 60,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Foi preciso focalizarmos as metas e objetivos da empresa e, a partir daí, decidirmos quais processos iriamos adotar.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [80]
		}, {
			"id": 80,
			"parent": 70,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Hoje utilizamos poucos métodos diferentes, mas todos buscam aprimorar nossa qualidade e produtividade!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [90]
		}, {
			"id": 90,
			"parent": 80,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Nossa gestora gostaria de falar com você sobre os aspectos gerenciais da organização.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [100]
		}, {
			"id": 100,
			"parent": 90,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Sim, você é um estagiário de desenvolvimento, mas entender a burocracia interna da empresa é importante!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [110]
		}, {
			"id": 110,
			"parent": 100,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Onde ela está? Da última vez que a vi, ela estava imprimindo relatórios para encaminhar ao Rodolfo.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": []
		}],
	},
	prog3: {		
		"actors": [ {
			"id": 10,
			"name": "hero"
		}, {
			"id": 20,
			"name": "girl"
		} ],
		"dialogues": [ {
			"id": 10,
			"parent": null,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Estagiário, como você já deveria saber, nossa organização está no terceiro degrau de maturidade de acordo com o Capability Maturity Model Integration, o CMMI.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [20]
		}, {
			"id": 20,
			"parent": 10,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Uma das etapas mais importantes para nós, desenvolvedores, é a de Integração de Produtos.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [30]
		}, {
			"id": 30,
			"parent": 20,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "A primeira fase consiste em determinar as sequências corretas de integração entre cada módulo.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [40]
		}, {
			"id": 40,
			"parent": 30,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Seguindo procedimentos bem definidos e cumprindo critérios pré-estabelecidos, podemos julgar o quão bem sucedido foi o procedimento.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [50 ]
		}, {
			"id": 50,
			"parent": 40,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "A segunda fase tem se mostrado uma atividade de desenho central para nosso sucesso.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [60]
		}, {
			"id": 60,
			"parent": 50,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Nossas interfaces são todas determinadas antes que qualquer programador escreva uma única linha de código!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [70]
		}, {
			"id": 70,
			"parent": 60,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Por fim, testamos o produto completo, seguindo diversos fluxos de execução para garantir a integração correta.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [80]
		}, {
			"id": 80,
			"parent": 70,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Se não tivessemos realizado o desenho de interfaces apriori, teriamos um trabalho extra nessa etapa para  garantir que a interação entre os módulos está correta.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [90]
		},  {
			"id": 90,
			"parent": 80,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Uma de nossas projetistas gostaria de discutir aspectos de Garantia de Qualidade com você. A última vez que a vi foi na sala de reuniões.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		}],
	},
	boss: {		
		"actors": [ {
			"id": 10,
			"name": "hero"
		}, {
			"id": 20,
			"name": "girl"
		} ],
		"dialogues": [ {
			"id": 10,
			"parent": null,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Termine suas tarefas!!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		}],
	},
	boss2: {		
		"actors": [ {
			"id": 10,
			"name": "hero"
		}, {
			"id": 20,
			"name": "girl"
		} ],
		"dialogues": [ {
			"id": 10,
			"parent": null,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "Bom trabalho estagiário!",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		}],
	}
};
