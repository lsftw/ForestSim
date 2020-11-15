// Dependencies: core/entity.js

// Alternate name - entitycontainer

// Note - Make sure to avoid double-including a entity in a scene,
//         include the CompositeEntity in a Scene, not the contained entities

// Note - Possibly consider treating a Scene as a CompositeEntity

var CompositeEntity = {
    makeEntity: function(scene) {
        var compositeEntity = Entity.makeEntity(scene);
        compositeEntity.entities = [];

        compositeEntity.draw = function(graphicsContext) {
            compositeEntity.entities.forEach(entity => {
                entity.draw(graphicsContext);
            });
        };

        compositeEntity.isVisible = function(viewport) {
            return Utility.arrayHasAny(compositeEntity.entities, componentEntity => componentEntity.isVisible(viewport));
        };

        compositeEntity.update = function(frameDelta) {
            compositeEntity.entities.forEach(entity => {
                entity.update(frameDelta);
            });
        };

        return compositeEntity;
    }
};
