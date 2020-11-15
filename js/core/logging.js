// Dependencies: None

function logWarning(message) {
    console.log("[WARNING] " + message);
}

function logDebug(message) {
    if (LOG_DEBUG) {
        console.log("[DEBUG] " + message);
    }
}
