// Dependencies: compositeentity.js grass.js

var GrassPatch = {
    makeEntity: function(scene, x, y, width, height, color) {
        var grassPatch = CompositeEntity.makeEntity(scene);
        grassPatch.name = 'grassPatch';
        grassPatch.x = x;
        grassPatch.y = y;
        grassPatch.width = width;
        grassPatch.height = height;
        grassPatch.color = color;

        // pointses (n.): 1. plural of points
        var pointses = [
            [
                { x: x, y: y - height / 3 },
                { x: x + 3 * width / 8, y: y },
                { x: x + 5 * width / 8, y: y }
            ],
            [
                { x: x + width / 4, y: y - 2 * height / 3 },
                { x: x + 3 * width / 8, y: y },
                { x: x + 5 * width / 8, y: y }
            ],
            [
                { x: x + width / 2, y: y - height },
                { x: x + 3 * width / 8, y: y },
                { x: x + 5 * width / 8, y: y }
            ],
            [
                { x: x + 3 * width / 4, y: y - 2 * height / 3 },
                { x: x + 3 * width / 8, y: y },
                { x: x + 5 * width / 8, y: y }
            ],
            [
                { x: x + width, y: y - height / 3 },
                { x: x + 3 * width / 8, y: y },
                { x: x + 5 * width / 8, y: y }
            ]
        ];
        for (var i = 0; i < pointses.length; i++) {
            var grassTuft = NewGrass.makeEntity(scene, pointses[i]);
            grassTuft.color = color;
            grassPatch.entities.push(grassTuft);
        }

        grassPatch.update = function(frameDelta) {
            grassPatch.entities.forEach(entity => {
                entity.update(frameDelta);
            });
        };

        return grassPatch;
    }
};
