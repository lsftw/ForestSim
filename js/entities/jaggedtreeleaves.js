// Dependencies: core/entity.js

// jagged evergreen leaves, composed of overlapping triangles

var JaggedTreeLeaves = {
    makeEntity: function(scene, x, y, width, height) {
        var leaves = Entity.makeEntity(scene);
        leaves.name = 'jagged tree leaves';
        leaves.color = '#59FF7D';

        leaves.x = x;
        leaves.y = y;
        leaves.width = width;
        leaves.height = height;

        leaves.shapePoints = []; // every 3 points compose a single triangle
        var numTriangles = 3;
        var overlapAmount = .7;
        for (var i = 0; i < numTriangles; i++) {
            leaves.shapePoints.push({ x: x            , y: y + height * (i+1) / numTriangles }); // bottom left point
            leaves.shapePoints.push({ x: x + width / 2, y: y + height * i*(1-overlapAmount) / numTriangles }); // top point
            leaves.shapePoints.push({ x: x + width    , y: y + height * (i+1) / numTriangles }); // bottom right point
        }

        leaves.draw = function(graphicsContext) {
            graphicsContext.fillStyle = leaves.color;
            graphicsContext.strokeStyle = leaves.color;
            graphicsContext.beginPath();

            for (var i = 0; i < leaves.shapePoints.length; i++) {
                var point = leaves.shapePoints[i];
                if (i % 3 == 0) { // every 3rd point starts a new triangle
                    graphicsContext.moveTo(point.x, point.y);
                } else {
                    graphicsContext.lineTo(point.x, point.y);
                }
            }
            graphicsContext.fill();
        };

        leaves.isVisible = function(viewport) {
            var viewLeft = viewport.x;
            var viewRight = viewport.x + viewport.width;
            var viewTop = viewport.y;
            var viewBottom = viewport.y + viewport.height;

            // This algorithm produces false negatives
            // The correct algorithm should use line-rectangle collision detection
            for (var i = 0; i < leaves.shapePoints.length; i++) {
                var point = leaves.shapePoints[i];
        
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

        return leaves;
    }
};
