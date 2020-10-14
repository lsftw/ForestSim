// Dependencies: entity.js

// new polygonal grass instead of rectangular grass

var NewGrass = {
    makeEntity: function(scene) {
        var grass = Entity.makeEntity(scene);
        grass.name = 'grass';
        grass.color = '#59FF7D';

        grass.angle = 0;
        grass.shapePoints = [];

        grass.draw = function(graphicsContext) {
            graphicsContext.fillStyle = grass.color;
            graphicsContext.fillRect(grass.x, grass.y, grass.width, grass.height);
        };

        var updatePointsToMatchSize = function(grass) {
            // need to support angle
            grass.shapePoints = [
                { x: grass.x, y: grass.y },
                { x: grass.x + grass.width / 2, y: grass.y + grass.height },
                { x: grass.x + grass.width, y: grass.y }
            ];
        };

        grass.update = function(timeDelta) {
            updatePointsToMatchSize(grass);
        };

        return grass;
    }
};
