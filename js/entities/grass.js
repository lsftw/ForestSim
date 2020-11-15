// Dependencies: core/entity.js

// 3-point triangular polygonal grass blade

var Grass = {
    makeEntity: function(scene, points) {
        var grass = Entity.makeEntity(scene);
        grass.name = 'grass';
        grass.color = '#59FF7D';

        grass.shapePoints = points; // array

        grass.draw = function(graphicsContext) {
            graphicsContext.fillStyle = grass.color;
            graphicsContext.beginPath();
            for (var i = 0; i < grass.shapePoints.length; i++) {
                var point = grass.shapePoints[i];
                if (i == 0) {
                    graphicsContext.moveTo(point.x, point.y);
                } else {
                    graphicsContext.lineTo(point.x, point.y);
                }
            }
            graphicsContext.fill();
        };

        grass.isVisible = function(viewport) {
            var viewLeft = viewport.x;
            var viewRight = viewport.x + viewport.width;
            var viewTop = viewport.y;
            var viewBottom = viewport.y + viewport.height;

            // This algorithm produces false negatives
            // The correct algorithm should use line-rectangle collision detection
            for (var i = 0; i < grass.shapePoints.length; i++) {
                var point = grass.shapePoints[i];
        
                var horizontallyContained = point.x > viewLeft && point.x < viewRight;
                var verticallyContained = point.y > viewTop && point.y < viewBottom;
        
                // two polygons collide if and only if at least 1 point is contained within the other polygon
                var overlapsWithViewport = horizontallyContained && verticallyContained;
                if (overlapsWithViewport) {
                    return true;
                }
            }
            return false;
        };

        grass.timer = 0;
        grass.direction = 1;
        var experimentalWindSway = function(grass, frameDelta) {
            grass.timer += frameDelta;
            if (grass.timer > 100) {
                grass.timer = 0;
                grass.direction *= -1;
            }
            grass.shapePoints[0].x += -.1 * frameDelta * grass.direction;
        };
        grass.update = function(frameDelta) {
            experimentalWindSway(grass, frameDelta);
        };

        return grass;
    }
};
