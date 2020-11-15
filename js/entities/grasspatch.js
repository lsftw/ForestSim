// Dependencies: core/compositeentity.js core/grass.js

// Grass patch made of 5 hardcoded grass blades

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
                { x: x                  , y: y + height * 2 / 3 },
                { x: x + width * 3 / 8  , y: y + height },
                { x: x + width * 5 / 8  , y: y + height }
            ],
            [
                { x: x + width / 4      , y: y + height / 3 },
                { x: x + width * 3 / 8  , y: y + height },
                { x: x + width * 5 / 8  , y: y + height }
            ],
            [
                { x: x + width / 2      , y: y },
                { x: x + width * 3 / 8  , y: y + height },
                { x: x + width * 5 / 8  , y: y + height }
            ],
            [
                { x: x + width * 3 / 4  , y: y + height / 3 },
                { x: x + width * 3 / 8  , y: y + height },
                { x: x + width * 5 / 8  , y: y + height }
            ],
            [
                { x: x + width          , y: y + height * 2 / 3 },
                { x: x + width * 3 / 8  , y: y + height },
                { x: x + width * 5 / 8  , y: y + height }
            ]
        ];
        for (var i = 0; i < pointses.length; i++) {
            var grassTuft = Grass.makeEntity(scene, pointses[i]);
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
