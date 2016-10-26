define(function (require,exports,module) {
	require("modules/list/list.css");
    var List = Backbone.View.extend({
        tpl:_.template('<a href="#layer/<%=id%>"><img src="<%=url%>" style="<%=style%>" alt="" /></a>'),
        rH:0,
        lH:0,
        initialize:function () {
            var me = this;
            this.listenTo(this.collection, 'add', function (model, collection) {
                // 通过render方法将model渲染到页面中
                this.render(model)
            });
            $(window).on('scroll', function () {
                // 获取body高度与窗口高度，窗口scrollTop高度，以及200的差值
                var h = $('body').height() - $(window).scrollTop() - $(window).height() - 200 < 0;
                // 当h是true，我们加载图片
                if (h) {
                    me.getData();
                }
                // 当滚动条顶部距离大于300时候将返回顶部按钮显示
                if ($(window).scrollTop() > 300) {
                    //me.showGoBack()
                } else {
                    //me.hideGoBack()
                }
            })
        },
        events:{
            "click .nav li":"showTypeView",
            'click .search span': 'showSearchView',
            "click span.arrow.green":"showAll"
        },
        render:function (model) {
            var data = {
                id : model.get("id"),
                url : model.get("url"),
                style: 'width: ' + model.get('viewWidth') + 'px; height: ' + model.get('viewHeight') + 'px;'
            };
            var htmltext = this.tpl(data);
            if(this.lH <= this.rH){
                this.renderLeft(model,htmltext);
                this.lH += model.get("viewHeight") + 6;
            }else{
                this.renderRight(model,htmltext)
                this.rH += model.get("viewHeight") + 6;
            }
        },
        renderLeft:function (model,htmltext) {
            var dom = this.$el.find(".left-container");
            dom.append($(htmltext));
        },
        renderRight:function (model,htmltext) {
            var dom = this.$el.find(".right-container");
            dom.append($(htmltext));
        },
        getData:function () {
            this.collection.fetchData("./data/imageList.json");
        },
        getDataId:function (dom) {
            return $(dom).attr("data-id");
        },
        collectionFilterByKey: function (value, key) {
            var myKey = key || 'title'
            var result = this.collection.filter(function (model) {
                if (myKey === 'type') {
                    return model.get(myKey) == value;
                }
                // 返回过滤条件
                return model.get(myKey).indexOf(value) > -1;
            })
            // 将结果返回
            return result;
        },
        resetView: function (arr) {
            var me = this;
            // 清空视图
            this.clearView();
            // 更新视图了，
            arr.forEach(function (model) {
                // 渲染每一个模型实例化对象
                me.render(model)
            })
        },
        clearView: function () {
            // 清空左视图内容，右视图内容，左容器高度，右容器高度
            this.$el.find('.left-container').html('');
            this.$el.find('.right-container').html('');
            this.leftHeight = 0;
            this.rightHeight = 0;
        },
        showTypeView:function (e) {
            var dataId = this.getDataId(e.target);
            var result = this.collectionFilterByKey(dataId, 'type')
            this.resetView(result)
        },
        getSearchValue: function () {
            return this.$el.find('.search input').val()
        },
        checkValue: function (value) {
            // 当结果只有空白符是不合法啊的
            if (/^\s*$/.test(value)) {
                alert('请输入搜索词');
                return false
            }
            return true;
        },
        showSearchView: function () {
            // 获取input的value值
            var value = this.getSearchValue();
            // 判断value值是否合法
            if (!this.checkValue(value)) {
                return ;
            };
            // 过滤字符的首位空白符
            value = value.replace(/^\s+|\s+$/g, '')
            // 根据value值进行集合过滤
            var result = this.collectionFilterByKey(value);
            // 根据result结果重新渲染视图
            this.resetView(result);
        },
        showAll:function () {
            console.log(1);
            var me = this;
            this.clearView();
            this.collection.forEach(function (model) {
                me.render(model);
            })
        }
    });
    module.exports = List;
})