// Dependencies: core/entity.js

var TreeTrunk = {
    makeEntity: function(scene, x, y, width, height) {
        var trunk = Entity.makeEntity(scene);
        trunk.name = 'tree trunk';
        trunk.color = '#7C4D2E';

        trunk.x = x;
        trunk.y = y;
        trunk.width = width;
        trunk.height = height;

        trunk.shapePoints = [
            { x: x                  , y: y + height },
            { x: x + width / 5      , y: y },
            { x: x + width * 4 / 5  , y: y },
            { x: x + width          , y: y + height }
        ];

        trunk.draw = function(graphicsContext) {
            graphicsContext.fillStyle = trunk.color;
            graphicsContext.strokeStyle = trunk.color;
            graphicsContext.beginPath();
            var centerPoint = Utility.findCenterPoint(trunk.shapePoints);

            var previousX;
            var previousY;
            for (var i = 0; i < trunk.shapePoints.length; i++) {
                var point = trunk.shapePoints[i];
                if (i == 0) {
                    graphicsContext.moveTo(point.x, point.y);
                } else {
                    // crude heuristic for detecting top/bottom side
                    if (previousY == point.y) {
                        graphicsContext.lineTo(point.x, point.y);
                    } else {
                        // curve inwards towards center
                        graphicsContext.quadraticCurveTo(centerPoint.x, centerPoint.y, point.x, point.y);
                    }
                }
                previousX = point.x;
                previousY = point.y;
            }
            //graphicsContext.fill();
            graphicsContext.closePath();
            graphicsContext.stroke();
        };

        trunk.isVisible = function(viewport) {
            var viewLeft = viewport.x;
            var viewRight = viewport.x + viewport.width;
            var viewTop = viewport.y;
            var viewBottom = viewport.y + viewport.height;

            // This algorithm produces false negatives
            // The correct algorithm should use line-rectangle collision detection
            for (var i = 0; i < trunk.shapePoints.length; i++) {
                var point = trunk.shapePoints[i];
        
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

        return trunk;
    }
};
