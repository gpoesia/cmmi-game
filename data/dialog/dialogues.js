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
			"conversant": 10,
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
			"outgoingLinks": [ 40 ]
		}, {
			"id": 40,
			"parent": 30,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "",
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
			"menuText": "Leave",
			"dialogueText": "Good by.",
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
			"dialogueText": "Sorry, I am in a hurry.",
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
			"dialogueText": "Thank you for the invitation. I'm sure I will.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		} ],
		
		numberOfInvitation:0	
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
			"dialogueText": "Olá, seja bem vindo! eu sou a garota1",
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
			"outgoingLinks": [ 40 ]
		}, {
			"id": 40,
			"parent": 30,
			"isChoice": false,
			"actor": 10,
			"conversant": 20,
			"menuText": "",
			"dialogueText": "",
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
			"menuText": "Leave",
			"dialogueText": "Good by.",
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
			"dialogueText": "Sorry, I am in a hurry.",
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
			"dialogueText": "Thank you for the invitation. I'm sure I will.",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		} ],
		
		numberOfInvitation:0	
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
			"dialogueText": "Olá, seja bem vindo! eu sou a garota 2",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		}],
		numberOfInvitation:0	
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
			"dialogueText": "Sou o programador 1",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		}],
		numberOfInvitation:0	
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
			"dialogueText": "Sou o programador 2",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		}],
		numberOfInvitation:0	
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
			"dialogueText": "Sou o programador 3",
			"conditionsString": "",
			"codeBefore": "",
			"codeAfter": "",
			"outgoingLinks": [ ]
		}],
		numberOfInvitation:0	
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
		numberOfInvitation:0	
	}
};
