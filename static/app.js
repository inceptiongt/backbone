define(function (require,exports,module) {
    var ImgCol = require("modules/collection/imgCol.js");
    var LayerView = require("modules/layer/layerView");
    var ListView = require("modules/list/listView");
    var imgCol = new ImgCol();
    var layerView = new LayerView({
        el:$(".layer"),
        collection:imgCol
    });
    var listView = new ListView({
        el:$(".list"),
        collection:imgCol
    });
    var Router = Backbone.Router.extend({
        routes:{
            "layer/:id":"showLayer",
            "*other":"showList"
        },
        showLayer:function (id) {
            layerView.id = id;
            layerView.render();
            listView.$el.hide();
            layerView.$el.show();
        },
        showList:function () {
            console.log("list");
            listView.getData();
            layerView.$el.hide();
            listView.$el.show();
        }
    })

    var router = new Router();
    module.exports = function () {
        Backbone.history.start();
    };
})