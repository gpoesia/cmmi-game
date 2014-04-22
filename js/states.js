// MelonJS game states corresponding to the various CMMI Game levels

game.customStatesCount = 0;
game.states = { };

// Create and register a new state given its name
function addGameState(name) {
    game.states[name] = me.state.USER + game.customStatesCount;
    game.customStatesCount += 1;
}

// Name the constants STATE_LEVEL_X_Y_Z, where X is the major level number
// (1 to 5) and Y is the sub-level number (in general, the number of the
// minigame the constant refers to), and Z is an optional text further
// describing the state. 
// For instance, STATE_LEVEL_4_2_INIT is the explanation text state for the
// second mini-game for the game level corresponding to CMMI Level 4

addGameState("STATE_LEVEL_4_1");
addGameState("STATE_LEVEL_4_1_PLAY");
