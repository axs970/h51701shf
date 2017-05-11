document.addEventListener('DOMContentLoaded',function(){
	var goods = document.querySelector('.goods');
	var num  = goods.querySelector('#num');
	var lbtn = goods.querySelector('.lbtn');
	var rbtn = goods.querySelector('.rbtn');

	var _num = parseInt(num.value);
	lbtn.onclick =function(){
		if(_num<2){
			_num = 1;
		}else{
			_num --;
		}
		var res=_num;
		num.value =res;
	}
	rbtn.onclick =function(){
		_num ++;
		var res=_num;
		num.value =res;
	}

	// 飞入购物车动画效果
	var cartNum
	var $buybtn = $('#buy');
	var $goodsNum = $('#goodsNum');
	$buybtn.click(function(){
		var $zoom = $('.zoom');
	  	var $img = $zoom.find('img');
	  	var $cloneImg = $img.clone();
	    cartNum = document.querySelector('#goodsNum');
	  	var _cartNum = parseInt(cartNum.value);

	  	$('body').append($cloneImg);
  		//给clone图片添加样式
  		$cloneImg.css({
  			"width":$img.width(),
  			"height":$img.height(),
  			"position":"absolute",
  			"top":$img.offset().top,
  			"left":$img.offset().left
  		})
  		// 点击时购物车显示商品数量
  		_cartNum += parseInt(num.value);
  		cartNum.value = _cartNum;
  		
  		// 动画
  		$cloneImg.animate({
  			"width":0,
  			"height":0,
  			"left":$goodsNum.offset().left,
  			"top":$goodsNum.offset().top 
  		},2000,function(){
  			//动画完成后执行
  			$cloneImg.remove();
  		})
	})

	// cookie存储商品信息
	var buy = document.querySelector('#buy');
	var carlist = getCookie('carlist');
	var detail = document.querySelector('h4');
	var rprice = document.querySelector('.rprice');
	var goodsMin = document.querySelector('.goods-min');
	carlist = carlist ? JSON.parse(carlist) : [];
	console.log(carlist);
	buy.onclick = function(){
		var goods = {
			name:detail.innerText,
			price:rprice.innerText,
			imgurl:goodsMin.children[0].src,
			qty:_num
		}
		carlist.push(goods);
		setCookie('carlist',JSON.stringify(carlist));
	}
});