define(function (require,exports,module) {
    require("modules/layer/layer.css");
    var h = $(window).height();
	var Layer = Backbone.View.extend({
        id:0,
        tpl:_.template($("#tpl_layer").html()),
        render:function () {
            var id = this.id;
            var model = this.collection.get(id);
            var data = {
                url : model.get("url"),
                title : model.get("title"),
                style : 'line-height: ' + h + 'px'
            }
            var html = this.tpl(data);
            this.$el.html(html);
        },
        events:{
            "click img":"toggleHeader",
            "click .arrow":"back",
            "swipeLeft .layer-container img":"showNextImage",
            "swipeRight .layer-container img": "showPreImage"
        },
        toggleHeader:function (e) {
            this.$el.find(".header").toggle();
        },
        back:function (e) {
            location.hash = '';
        },
        showNextImage:function () {
            this.id++;
            var tatleNom = this.collection.length;
            console.log(tatleNom,this.id);
            if(this.id >= tatleNom){
                alert("没有更多了");
                this.id = tatleNom;
            }else{
                this.cleanData();
                this.render(this.id)
            }
        },
        showPreImage:function () {
            this.id--;
            if(this.id < 0){
                alert("已经是第一张了");
                this.id = 0;
            }else{
                this.cleanData();
                this.render(this.id)
            }
        },
        cleanData:function () {
            this.$el.html("");
        }
    })
    module.exports = Layer;
})