// Dependencies: core/scene.js, core/settings.js, core/logging.js

// The View-Controller in the game's MVC

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
    canvasViewport: {
        x: 0,
        y: 0,
        width: undefined,
        height: undefined
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

function keyPressed(key) {
    logDebug("Key pressed: " + key);
    switch (key) {
        case 'a':
            Game.canvasViewport.x -= 50;
            break;
        case 'd':
            Game.canvasViewport.x += 50;
            break;
        case 'w':
            Game.canvasViewport.y -= 5;
            break;
        case 's':
            Game.canvasViewport.y += 5;
            break;
        case '0':
            Game.canvasViewport.x = 0;
            Game.canvasViewport.y = 0;
            break;
    }
}

function addEventListeners() {
    window.addEventListener('keypress', function(e) {
        keyPressed(e.key);
    });
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
    Game.scene = ForestGenerator.makeScene(Game.getCanvasWidth() * 3, Game.getCanvasHeight());
}

function updateCanvasViewport() {
    Game.canvasViewport.width = Game.getCanvasWidth();
    Game.canvasViewport.height = Game.getCanvasHeight();
}

function draw() {
    var graphicsContext = Game.getCanvasContext();
    graphicsContext.save();
    clearScreen(graphicsContext);
    graphicsContext.translate(-Game.canvasViewport.x, -Game.canvasViewport.y);
    Game.scene.draw(graphicsContext, Game.canvasViewport);
    graphicsContext.restore();
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

    Game.scene.update(frameDelta);
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
    updateCanvasViewport();
    draw();
    Game.timeSinceLastFrame = Date.now();
}

function startGame() {
    resetGame();
    updateCanvasViewport();
    draw(); // avoid blank screen if game starts w/o focus
    unpauseGame();
    addEventListeners();
    addFocusListeners();
    console.log('Type \"PAUSE_ON_FOCUS_LOSS = false\" without quotes to disable auto-pause.');
}
startGame();
