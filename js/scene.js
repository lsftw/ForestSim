
function makeScene() {
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
        var updatedEntities = scene.entities.filter(entity => !entityIdsToRemove.has(entity.id));
        updatedEntities.concat(entitiesToAdd);
        scene.entities = updatedEntities;
        scene.entitiesToAdd = [];
        scene.entityIdsToRemove.clear();
    }

    scene.update = function(frameDelta) {
        addRemoveEntities(scene.entities);
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
