//初始化页面布局
var init = function(){

	var container = $("#pic-container");//console.log(container[0]);console.log(document.getElementById("pic-container"));jqurey获得的是一个包括节点在内的集合
	var container_w = (container[0].currentStyle? container[0].currentStyle : window.getComputedStyle(container[0], null)).width;
	//在html页面中写一个原始的item节点，以算出宽度
	var col_0 = $("#col_0");
	var col_1 = $("#col_1");
	var col_2 = $("#col_2");
	var col_3 = $("#col_3");
	var item_w  = parseInt(window.getComputedStyle(col_0[0], null).width);
	// console.log(window.getComputedStyle(document.getElementById("item"), null).width);
	var itemhtml = new Array();
	
	var item_html = "";

	var total = 13;

	for (var i = 1; i <= total; i++) {
		var img = "img_"+i+".jpg"; 
		itemhtml[i] = '<div class="item" ><div class="animate-box"><a href="images/'+img+'" class=""><canvas id="cvs_'+i+'"></canvas></a><div class="pic-descript">The description of this picture .</div></div></div>';
		
		var imgObj = new Image();
		imgObj.index = i;
		imgObj.src = "images/"+img;
		
		
		// cvs[0].parentNode.parentNode.parentNode.style.height+=h;	
		
		imgObj.onload = function(){

			var cols = $("#pic-container > div");
			var cols_height_arr = new Array();
			cols.each(function(index,value){
				//这里的value是dom对象 不是juery对象
				cols_height_arr[index] = cols.eq(index).outerHeight(true);
			});
			var col_min_h = Math.min.apply(null,cols_height_arr);
			var col_min_h_index = $.inArray(col_min_h,cols_height_arr);
			cols.eq(col_min_h_index).append(itemhtml[this.index]);


			var cvs = $("#cvs_"+this.index);
			var context = cvs[0].getContext("2d");
			var w = item_w-10;
			var h = w/this.width * this.height;

			cvs[0].style.borderRadius = "4px";

			cvs[0].width = w;
			cvs[0].height = h;

			cvs.parent().parent().addClass("bounceIn animated");
			context.drawImage(this,0,0,w,h);

		}
	}
 }
	

$(document).ready(function(){

	init();

	var key = 14;
	var container = $("#pic-container");

	var data_json={"data" : [{"src":"images/img_16.jpg"},{"src":"images/img_17.jpg"},{"src":"images/img_18.jpg"},{"src":"images/img_19.jpg"},{"src":"images/img_20.jpg"}]}
	var imgObj = new Image();
	var ran = Math.floor(Math.random()*5);
	imgObj.src = data_json.data[ran].src;

	var item_w  = parseInt(window.getComputedStyle(document.getElementsByClassName("col")[0], null).width);
	//用于记录是否生成新的item
	var new_item = true;

	window.onscroll;

// --------------------------------------------------------------------------

	window.onscroll = function(){

		var cols = $("#pic-container > div");
		var cols_height_arr = new Array();

		if (checkLoad()) {
			//检测哪一列最短
			cols.each(function(index,value){//这里的value是dom对象 不是juery对象
				cols_height_arr[index] = cols.eq(index).outerHeight(true);
			});
			var col_min_h = Math.min.apply(null,cols_height_arr);
			var col_min_h_index = $.inArray(col_min_h,cols_height_arr);


			var clientHeight = window.innerHeight || document.documentElement.clientHeight;
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			
			// imgObj.src = "images/img_16.jpg";
			if (new_item) {
				var ran = Math.floor(Math.random()*5);
				imgObj.src = data_json.data[ran].src;							
			}
			
			imgObj.onload = function(){
				var w = item_w-10;//console.log(cvs.parent()[0].parentNode.style.height);
				var h = w/this.width * this.height;
				if(new_item){
					item_html = '<div class="item " ><div class="animate-box"><a href='+this.src+' class=""><canvas id="cvs_'+key+'"></canvas></a><div class="pic-descript">Veniam voluptatum voluptas tempora debitis harum totam vitae hic quos.</div></div></div>'
					cols.eq(col_min_h_index).append(item_html);

					var cvs = $("#cvs_"+key);
					var context = cvs[0].getContext("2d");

					cvs[0].style.borderRadius = "4px";
					cvs[0].width = w;
					cvs[0].height = h;
					new_item = false;
				}
				if(!new_item && col_min_h  < clientHeight+scrollTop) {
					var cvs = $("#cvs_"+key);
					var context = cvs[0].getContext("2d");

					cvs.parent().parent().addClass("bounceIn animated");
					context.drawImage(this,0,0,w,h);
					new_item = true;
					key++;
					
				}
			}
			
		}
	}

// -------------------------------------------------------------------------


});


//检测是否具备加载图片的条件
var checkLoad = function(){
		//检测哪一列最短
		var cols = $("#pic-container > div");
		var cols_height_arr = new Array();
		cols.each(function(index,value){
			//这里的value是dom对象 不是juery对象
			cols_height_arr[index] = cols.eq(index).outerHeight(true);
		});
		var col_min_h = Math.min.apply(null,cols_height_arr);
		var col_min_h_index = $.inArray(col_min_h,cols_height_arr);

		var clientHeight = window.innerHeight || document.documentElement.clientHeight;
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		if(col_min_h  < clientHeight+scrollTop){
			return true;
		}else{
			return false;
		}
}


