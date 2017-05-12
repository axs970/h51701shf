		document.addEventListener('DOMContentLoaded',()=>{
			// 获取元素，声明变量
			var carousel = document.querySelector('.carousel');
			var list = carousel.querySelector('ul');
			var firstImg = carousel.querySelector('img');

			// 给页面添加左右按钮
			var prevbtn = document.createElement('span');
			prevbtn.classList.add('prev');
			prevbtn.innerHTML = '&lt';
			var nextbtn = document.createElement('span');
			nextbtn.classList.add('next');
			nextbtn.innerHTML = '&gt';
			carousel.appendChild(prevbtn);
			carousel.appendChild(nextbtn);

			// 复制第一图片，并添加到ul的最后
			var copyLi = list.children[0].cloneNode('true');
			list.appendChild(copyLi);

			var len = list.children.length;
			var index = 0;
			var scrollTimer;

			
			// 获取图片宽度，设置ul宽度，使图片能在一排显示
			var imgWidth;
			firstImg.onload = ()=>{
				imgWidth = firstImg.offsetWidth;
				list.style.width = len*imgWidth +'px';
			}
			

			// 添加分页效果
			var page = document.createElement('div');
			page.classList.add('page');

			for(var i=1;i<len;i++){
				var span = document.createElement('span');
				span.innerHTML = i;

				if(i===1){
					span.classList.add('active');
				}

				page.appendChild(span);
			}

			carousel.appendChild(page);


			var timer = setInterval(autoPlay,3000);
			function autoPlay(){
				index++;
				showPic();
			}
			// 绑定鼠标移入移出事件
			carousel.onmouseenter = (e)=>{
				clearInterval(timer);
				prevbtn.style.opacity = '0.9';
				nextbtn.style.opacity = '0.9';
			}
			carousel.onmouseleave = ()=>{
				timer = setInterval(autoPlay,3000);
				prevbtn.style.opacity = '0';
				nextbtn.style.opacity = '0';
			}
			// 点击跳转
			carousel.onclick = (e)=>{
				e = e || window.event;
				e.target = e.target || e.srcElement;
				if(e.target.className =='prev'){
					index--;
					showPic();
				}else if(e.target.className =='next'){
					index++;
					showPic();
				}
				else if(e.target.tagName.toLowerCase() =='span'){
					index = e.target.innerText -1;
					showPic();
				}
			}

			function showPic(){
				if(index>len-1){
					index = 1;
					list.style.left =0;
				}else if(index<0){
					index = len - 1;
				}

				// 分页高亮效果
				for(var i=0;i<len-1;i++){
					page.children[i].classList.remove('active');
				}
				// 当滚动到复制图片时
				if(index === len-1){
					page.children[0].classList.add('active');
				}else{
					page.children[index].classList.add('active');
				}

				var target = - index*imgWidth;
				clearInterval(scrollTimer);
				// 设置速度
				scrollTimer = setInterval(()=>{
					var current = list.offsetLeft;
					var  speed = (current - target)/10;
					// 速度判断
					speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
					// 条件判断，停止定时器
					if(current == target){
						clearInterval(scrollTimer);
						current = target +speed;
					}
					list.style.left = current - speed +'px';

				},30)
				
			}
			
		})
