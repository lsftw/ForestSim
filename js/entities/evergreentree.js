// Dependencies: core/compositeentity.js entities/treetrunk.js entities/jaggedtreeleaves.js

var EvergreenTree = {
    makeEntity: function(scene, x, y, width, height) {
        var tree = CompositeEntity.makeEntity(scene);
        tree.name = 'evergreen tree';
        tree.x = x;
        tree.y = y;
        tree.width = width;
        tree.height = height;

        var leavesToTreeHeightRatio = .6;

        var leaves = JaggedTreeLeaves.makeEntity(scene, x, y, width, height * leavesToTreeHeightRatio);
        tree.entities.push(leaves);

        var trunk = TreeTrunk.makeEntity(scene, x, y + height * leavesToTreeHeightRatio, width, height * (1 - leavesToTreeHeightRatio));
        tree.entities.push(trunk);

        return tree;
    }
};
