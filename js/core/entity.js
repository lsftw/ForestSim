// Dependencies: core/scene.js (but load this before scene.js)

// Entities are dependent on their containing scene to call draw/update

var Entity = {
    latestEntityId: 0,
    // NOT thread-safe
    generateUniqueEntityId: function() {
        return ++Entity.latestEntityId;
    },
    makeEntity: function(scene) {
        // current implementation only supports rectangular entities
        var entity = {
            id: Entity.generateUniqueEntityId(),
            scene: scene, // used to add/remove other entities
            name: 'entity',
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
            var viewLeft = viewport.x;
            var viewRight = viewport.x + viewport.width;
            var viewTop = viewport.y;
            var viewBottom = viewport.y + viewport.height;
    
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
}
