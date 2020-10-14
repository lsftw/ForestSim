// Dependencies: compositeentity.js grass.js

var GrassPatch = {
    makeEntity: function(scene) {
        var grassPatch = CompositeEntity.makeEntity(scene);
        grassPatch.name = 'grassPatch';

        grass.draw = function(graphicsContext) {
            graphicsContext.fillStyle = grass.color;
            graphicsContext.fillRect(grass.x, grass.y, grass.width, grass.height);
        };

        // Possibly consider moving this up to CompositeEntity
        var propagatePropertiesToContainedEntities = function(compositeEntity) {
            for (var i = 0; i < compositeEntity.entities.length; i++) {
                var entity = compositeEntity.entities[i];
                entity.color = compositeEntity.color;
                entity.width = compositeEntity.width / compositeEntity.entities.length;
                entity.height = compositeEntity.height;
                entity.x = compositeEntity.x + compositeEntity.width * i;
                entity.y = compositeEntity.y;
            }
        };

        grassPatch.update = function(frameDelta) {
            propagatePropertiesToContainedEntities(grassPatch);
        };

        return grassPatch;
    }
};
