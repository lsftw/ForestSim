
var EntityIds = {
    latestId: 0
};

// NOT thread-safe
function generateUniqueEntityId() {
    return ++EntityIds.latestId;
}

function makeEntity() {
    // current implementation only supports rectangular entities
    var entity = {
        id: generateUniqueEntityId(),
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    // Used for performance purposes, won't draw if not visible
    entity.isVisible = function(viewport) {
        var entityLeft = entity.x;
        var entityRight = entity.x + entity.width;
        var entityTop = entity.y;
        var entityBottom = entity.y + entity.height;
        var viewLeft = view.x;
        var viewRight = view.x + view.width;
        var viewTop = view.y;
        var viewBottom = view.y + view.height;

        var leftSideContained = entityLeft > viewLeft && entityLeft < viewRight;
        var rightSideContained = entityRight > viewLeft && entityRight < viewRight;
        var topSideContained = entityTop > viewTop && entityTop < viewBottom;
        var bottomSideContained = entityBottom > viewTop && entityBottom < viewBottom;

        var horizontallyContained = leftSideContained || rightSideContained;
        var verticallyContained = topSideContained || bottomSideContained;

        // two rectangles collide if and only if at least 1 edge is contained within the other rectangle
        var overlapsWithViewport = horizontallyContained && verticallyContained;
        return overlapsWithViewport;
    };

    entity.draw = function(graphicsContext) {
        graphicsContext.fillStyle = '#00870D';
        graphicsContext.fillRect(entity.x, entity.y, entity.width, entity.height);
    };

    entity.update = function(frameDelta) { };

    return entity;
}
