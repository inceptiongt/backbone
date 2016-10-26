// 定义img图片模型模块
define(function (require, exports, module) {
	// 获取页面的宽度
	var w = ($(window).width() - 6 * 3) / 2;
	// 定义模型类
	var ImgModel = Backbone.Model.extend({
		initialize: function () {
			this.on('add', function (model) {
				// 为模型添加viewWidth和viewHeight属性
				// 计算viewHeight值 h  = H / W * w
				var h = model.get('height') / model.get('width') * w;
				// 为模型添加viewWidth和ViewHeight
				model.set({
					viewWidth: w,
					viewHeight: h
				})
			})
		}
	})
	module.exports = ImgModel;
})