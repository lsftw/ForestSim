// Dependencies: compositeentity.js grass.js

var GrassPatch = {
    makeEntity: function(scene) {
        var grassPatch = CompositeEntity.makeEntity(scene);
        grassPatch.name = 'grassPatch';

        // Possibly consider moving this up to CompositeEntity
        var propagatePropertiesToContainedEntity = function(compositeEntity, entity, index) {
            entity.color = compositeEntity.color;
            entity.width = compositeEntity.width / compositeEntity.entities.length;
            entity.height = compositeEntity.height;
            entity.x = compositeEntity.x + compositeEntity.width * index;
            entity.y = compositeEntity.y;
        };

        var minAngle = Math.PI / 5;
        var maxAngle = Math.PI * 4 / 5;
        var tuftsOfGrass = 4;
        for (var i = 0; i < tuftsOfGrass; i++) {
            var grassTuft = NewGrass.makeEntity(scene);
            propagatePropertiesToContainedEntity(grassPatch, grassTuft, i);
            if (tuftsOfGrass == 1) {
                grassTuft.angle = (maxAngle - minAngle) / 2;
            } else {
                grassTuft.angle = i * (maxAngle - minAngle) / (tuftsOfGrass - 1);
            }
            grassPatch.entities.push(grassTuft);
        }

        /*grassPatch.draw = function(graphicsContext) {
            grassPatch.entities.forEach(entity => {
                entity.draw(graphicsContext);
            });
        };*/

        // Possibly consider moving this up to CompositeEntity
        var propagatePropertiesToContainedEntities = function(compositeEntity) {
            for (var i = 0; i < compositeEntity.entities.length; i++) {
                var entity = compositeEntity.entities[i];
                propagatePropertiesToContainedEntity(compositeEntity, entity, i);
            }
        };

        grassPatch.update = function(frameDelta) {
            propagatePropertiesToContainedEntities(grassPatch);
            grassPatch.entities.forEach(entity => {
                entity.update(frameDelta);
            });
        };

        return grassPatch;
    }
};
