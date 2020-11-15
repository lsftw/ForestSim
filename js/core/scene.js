// Dependencies: core/entity.js

// The Model in the game's MVC

// Scenes are dependent on a Game to initialize them and call draw/update
//  and dependent on their containing entities to add/remove entities

var Scene = {
    makeScene: function() {
        var scene = {
            entities: [],
            entitiesToAdd: [],
            entityIdsToRemove: new Map()
        };
    
        scene.draw = function(graphicsContext, viewport) {
            scene.entities.forEach(entity => {
                if (entity.isVisible(viewport)) {
                    entity.draw(graphicsContext);
                }
            });
        };
    
        var addRemoveEntities = function(scene) {
            var updatedEntities = scene.entities.filter(entity => !scene.entityIdsToRemove.has(entity.id));
            updatedEntities.concat(scene.entitiesToAdd);
            scene.entities = updatedEntities;
            scene.entitiesToAdd = [];
            scene.entityIdsToRemove.clear();
        }
    
        scene.update = function(frameDelta) {
            addRemoveEntities(scene);
            scene.entities.forEach(entity => {
                entity.update(frameDelta);
            });
        };
    
        // NOT thread safe, assumed to be quickly called by contained entities during update()
        scene.addEntity = function(entity) {
            scene.entitiesToAdd.push(entity);
        };
        scene.removeEntity = function(entity) {
            scene.entityIdsToRemove.push(entity.id);
        };
    
        return scene;
    }
};
