
var Game = {
    canvas: document.getElementById('gameCanvas'),
    getCanvasWidth: function(){
        return this.canvas.width;
    },
    getCanvasHeight: function(){
        return this.canvas.height;
    },
    getCanvasContext: function(){
        return Game.canvas.getContext("2d");
    },
    canvasViewPort: {
        x: 0,
        y: 0,
        width: this.getCanvasWidth(),
        height: this.getCanvasHeight()
    },
    runIntervalFunctionId: undefined, // used to pause/unpause game loop
    scene: undefined, // the game model
    gameStartTime: undefined,
    timeSinceLastFrame: undefined,
};

function addFocusListeners() {
    // window focus gained
    window.addEventListener("focus", function(event) {
        unpauseGame();
    }, false);
    // window focus lost
    window.addEventListener("blur", function(event) {
        if (PAUSE_ON_FOCUS_LOSS) {
            pauseGame();
        }
    }, false);
}

function pauseGame() {
    if (Game.runIntervalFunctionId) {
        clearInterval(Game.runIntervalFunctionId);
        delete Game.runIntervalFunctionId;
    }
}

function unpauseGame() {
    if (!Game.runIntervalId) {
        Game.timeSinceLastFrame = Date.now(); // avoid queueing up update
        Game.runIntervalFunctionId = setInterval(run, RUN_INTERVAL_MILLISECONDS);
    }
}

function resetGame() {
    Game.gameStartTime = Date.now();
    Game.scene = makeScene();
    unpauseGame();
}

function draw() {
    var graphicsContext = getCanvasContext();
    clearScreen(graphicsContext);
    scene.draw(graphicsContext, canvasViewPort);
}
function clearScreen(graphicsContext) {
    graphicsContext.fillStyle = BACKGROUND_COLOR;
    graphicsContext.fillRect(0, 0, Game.getCanvasWidth(), Game.getCanvasHeight());
}

function update(frameDelta) {
    if (frameDelta < 0) {
        logWarning("Negative framesElapsed (" + frameDelta + ") sent to update, skipping.");
        return;
    }

    scene.update(frameDelta);
}

function getFramesElaspedSinceLastUpdate() {
    var timeElapsedMilliseconds = Date.now() - Game.timeSinceLastFrame;
    return timeElapsedMilliseconds / FRAME_INTERVAL_MILLISECONDS;
}

// update game state, draw game state, repeat
function run() {
    // this check is also necessary in case focus/blur events don't fire
    if (PAUSE_ON_FOCUS_LOSS && !document.hasFocus()) {
        Game.timeSinceLastFrame = Date.now(); // avoid queueing up update
        return;
    }

    var framesElapsed = getFramesElaspedSinceLastUpdate();
    update(framesElapsed);
    draw();
    Game.timeSinceLastFrame = Date.now();
}

function startGame() {
    addFocusListeners();
    draw(); // avoid blank screen if game starts w/o focus
    resetGame();
    console.log('Type \"PAUSE_ON_FOCUS_LOSS = false\" without quotes to disable auto-pause.');
}
startGame();
