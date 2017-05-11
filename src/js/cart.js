document.addEventListener('DOMContentLoaded',function(){
	var carList = document.querySelector('.car-list');
	var subPrice = document.querySelector('.subPrice')
	var btnClear = document.querySelector('.btnclear')
	var goodslist = getCookie('carlist');
	
	goodslist = goodslist ? JSON.parse(goodslist) : [];
	var ul = document.createElement('ul');
	var totalPrice = 0;
	ul.innerHTML = goodslist.map(function(item){
		console.log(item.price)
		totalPrice += parseInt(item.price) * item.qty;
		
		return `<li>
			<img src="${item.imgurl}">
			<span>${item.name}</span>
			<span class="price">${item.price}</span>
			<span>${item.qty}</span>
			<span class="btn-close">&times;</span>
			</li>`;		
			}).join('');
	carList.appendChild(ul);
	subPrice.innerHTML = totalPrice.toFixed(1);
	// 清空购物车
	btnClear.onclick = function(){
		removeCookie('carlist');

		// 刷新页面
		location.reload();
	}

	carList.onclick = function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;

		if(target.className === 'btn-close'){
			var currentLi = target.parentNode;
			var currentGUID = currentLi.getAttribute('data-guid');

			// 移除DOM节点
			currentLi.parentNode.removeChild(currentLi);

			// 清除cookie中对应的商品信息
			for(var i=0;i<goodslist.length;i++){
				if(goodslist[i].guid === currentGUID){
					goodslist.splice(i,1);
					break;
				}
			}

			// 删除后重写cookie
			setCookie('carlist',JSON.stringify(goodslist));
				}
			}
});