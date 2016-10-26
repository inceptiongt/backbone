define(function (require,exports,module) {
    var imgMod = require("modules/model/imgMod");
    var ImgCol = Backbone.Collection.extend({
        model:imgMod,
        imgId:0,
        fetchData:function (url) {
            var me = this;
            $.get(url,function (res) {
                if(res && res.errno == 0){
                    res.data.map(function (value) {
                        value.id = me.imgId++;
                    });
                    me.add(res.data);
                }
            })
        }
    })
    module.exports = ImgCol;
})