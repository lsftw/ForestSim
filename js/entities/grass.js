// Dependencies: entity.js

// new polygonal grass instead of rectangular grass

var NewGrass = {
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
                    graphicsContext.strokeStyle = "#ff0000";
                } else {
                    graphicsContext.lineTo(point.x, point.y);
                    if (i == grass.shapePoints.length - 1) {
                        graphicsContext.strokeStyle = "#000000";
                        point = grass.shapePoints[0];
                        graphicsContext.lineTo(point.x, point.y);
                    }
                }
            }
            graphicsContext.fill();
        };

        grass.isVisible = function(viewport) {
            var viewLeft = viewport.x;
            var viewRight = viewport.x + viewport.width;
            var viewTop = viewport.y;
            var viewBottom = viewport.y + viewport.height;

            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                var pointLeft = point.x;
                var pointRight = point.x + point.width;
                var pointTop = point.y;
                var pointBottom = point.y + point.height;
        
                var leftSideContained = pointLeft > viewLeft && pointLeft < viewRight;
                var rightSideContained = pointRight > viewLeft && pointRight < viewRight;
                var topSideContained = pointTop > viewTop && pointTop < viewBottom;
                var bottomSideContained = pointBottom > viewTop && pointBottom < viewBottom;
        
                var horizontallyContained = leftSideContained || rightSideContained;
                var verticallyContained = topSideContained || bottomSideContained;
        
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
        var experimentalWindSway = function(grass) {
            grass.timer++;
            if (grass.timer > 50) {
                grass.timer = 0;
                grass.direction *= -1;
            }
            grass.shapePoints[0].x += -.2 * grass.direction;
        };
        grass.update = function(timeDelta) {
            experimentalWindSway(grass);
        };

        return grass;
    }
};
