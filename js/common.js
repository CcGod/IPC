$(document).ready(function(){
	topNavClick();

})
//绑定顶部导航的点击事件
var topNavClick = function(){
	var top_nav_li = $("#topNav li");
	top_nav_li.each(function(index,value){
		$(value).click(function(){
			if (!$(value).hasClass("active")) {
				$(value).addClass("active bounce animated");
				if (!$(value).hasClass("animated")) {$(value).addClass("bounce animated");}
				// index == 0 ? top_nav_li.eq(index + 1).removeClass("active") : top_nav_li.eq(index - 1).removeClass("active");
				if( index == 0 ){
					top_nav_li.eq(index + 1).removeClass("active");

				}else{
					top_nav_li.eq(index - 1).removeClass("active");
				}
			}
		});
			
	});

}


//刷新后，使滚动条在最上方
$(window).unload(function(){
	window.scrollTo(0,0);
});
