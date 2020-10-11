// Dependencies: entity.js

var Grass = {
    makeEntity: function(scene) {
        var grass = Entity.makeEntity(scene);
        grass.name = 'grass';
        grass.color = '#59FF7D';

        grass.draw = function(graphicsContext) {
            graphicsContext.fillStyle = grass.color;
            graphicsContext.fillRect(grass.x, grass.y, grass.width, grass.height);
        };

        return grass;
    }
};
