$(document).ready(function(){
	d_init();
	filterPick();
	filterOn();
})

//初始化
var d_init = function(){

	var cvs = $("#detail-cvs");
	var context = cvs[0].getContext("2d");
	var con = $("#detail-con");
	var img = "img_5.jpg"; 

	//设置特效区的宽度
	var effect = $("#effects");
	effect.css("width" , con.innerWidth() * .2);
	//创建图像对象
	var imgObj = new Image();

	//更改一下图片来源
	imgObj.src = "images/"+img;
	// imgObj.src = img;
	imgObj.onload = function(){
		// console.log(imgObj.width);
		// console.log(imgObj.height);
		cvs[0].width = con.innerWidth() * .7;
		cvs[0].height = cvs[0].width/imgObj.width * imgObj.height;
		// console.log(cvs[0].height);
		context.drawImage(imgObj,0,0,cvs[0].width,cvs[0].height);
	}

}

//为每一个滤镜li绑定点击事件
var filterPick = function(){
	var filters = $("#effects li");
	filters.each(function(index,value){
		$(value).click(function(){
			if (!$(value).hasClass("eff-active")) {
				$(value).addClass("eff-active");
				filters.each(function(i,v){
					if (i != index && filters.eq(i).hasClass("eff-active")) {
						filters.eq(i).removeClass("eff-active");
					}
				})
			}
			
		})
	})
}

//----------------------------单独为每一个滤镜绑定事件---------------------------------
var filterOn = function(){
	//获取存储像素的一维数组 imageData.data
	var cvs = $("#detail-cvs"),
		context = cvs[0].getContext("2d"),
		imageData = context.getImageData(0, 0, cvs.width, cvs.height),
		pixelData = imageData.data;
	console.log(cvs);
	//gray filter灰度滤镜
	var grey = $("#grey");
	grey.click(function(){
		for (var i = 0; i < cvs.width * cvs.height; i++) {
			//第i个像素的R通道
			var r = pixelData[4 * i + 0];
			//第i个像素的G通道
			var g = pixelData[4 * i + 1];
			//第i个像素的B通道
			var b = pixelData[4 * i + 2];
			//第i个像素的A通道
			var a = pixelData[4 * i + 3];

			//获取最合适的灰度值
			var grey_px = r*.3 + g*.59 + b*.11;

			//更新通道颜色
			pixelData[4 * i + 0] = grey_px;
			pixelData[4 * i + 1] = grey_px;
			pixelData[4 * i + 2] = grey_px;

		}
		cvs.putImageData(imageData, 0, 0);
	})
}

//----------------------------单独为每一个滤镜绑定事件---------------------------------