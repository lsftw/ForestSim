// Dependencies: entity.js

// new polygonal grass instead of rectangular grass

var NewGrass = {
    makeEntity: function(scene) {
        var grass = Entity.makeEntity(scene);
        grass.name = 'grass';
        grass.color = '#59FF7D';

        grass.angle = 0; // in radians
        grass.shapePoints = [];

        grass.draw = function(graphicsContext) {
            graphicsContext.fillStyle = grass.color;
            graphicsContext.beginPath();
            for (var i = 0; i < grass.shapePoints.length; i++) {
                if (i == 0) {
                    graphicsContext.moveTo(grass.shapePoints[i]);
                } else {
                    graphicsContext.lineTo(grass.shapePoints[i]);
                }
            }
            graphicsContext.fill();
        };

        var updateShapePoints = function(grass) {
            // need to support angle
            var basePoints = [
                { x: grass.x, y: grass.y },
                { x: grass.x + grass.width / 2, y: grass.y - grass.height },
                { x: grass.x + grass.width, y: grass.y }
            ];
            var centerPoint = {
                x: grass.x + grass.width / 2,
                y: grass.y - grass.height / 2
            };
            grass.shapePoints = basePoints.map(shapePoint => rotatePointAroundCenter(shapePoint, centerPoint, angle));
        };

        grass.update = function(timeDelta) {
            updateShapePoints(grass);
        };

        return grass;
    }
};
