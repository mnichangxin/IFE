//数据队列
var queue = []; 

//排序快照
var snapshot = [];

//动画间隔
var INTERVAL = 50;

//随机队列
function queueRandom() {

	queue = [];

	for (var i = 0; i < 60; ++i) {

		queue.push(Math.floor(Math.random() * 90 + 10));
	}

	render();
}

/*
 * 排序算法,后续继续添加更多算法
 */
var sort = {

	//冒泡排序，每一次循环保存当前数组的快照
	bubble: function() {

		for (var i = 0, len = queue.length; i < len; ++i) {

			for (var j = 1; j < len - i; ++j) {

				if (queue[j - 1] > queue[j]) {

					var temp = queue[j - 1];
					queue[j - 1] = queue[j];
					queue[j] = temp;

					snapshot.push(JSON.parse(JSON.stringify(queue))); //保存快照
				}
			}
		}

		paint();

	}
};

window.onload = function() {

	var inOut = document.getElementById('in-out');
	var wrap = document.getElementById('wrap');
	var bubble = document.getElementById('bubble');
	var random = document.getElementById('random'); 

	//按钮点击触发的事件
	inOut.addEventListener('click', buttonHandler);

	//队列项点击触发的事件
	wrap.addEventListener('click', itemHandler);

	//随机生成
	random.addEventListener('click', queueRandom);

	//冒泡排序
	bubble.addEventListener('click', sort.bubble);

}

//按钮事件
function buttonHandler(event) {

	var item = document.getElementById('item');

	if (event.target.tagName.toLowerCase() == 'button' && (/^([1-9]\d|100)$/).test(item.value) && queue.length <= 60) {

		if (event.target.id == 'left-in') {	 
			queue.unshift(parseInt(item.value));
		}

		if (event.target.id == 'right-in') {
			queue.push(parseInt(item.value));
		} 
	}

	if (event.target.id == 'left-out') {
		queue.length ? alert(queue.shift()) : 0;
	} 

	if(event.target.id == 'right-out') {
		queue.length ? alert(queue.pop()) : 0;
	}

	render();
} 

//队列项点击事件
function itemHandler(event) {

	if (event.target.className == 'item') {

		var target = event.target;

		queue.splice(queue.indexOf(target.innerHTML), 1);

		target.parentNode.removeChild(event.target);
	}
}

//队列渲染
function render(snapshot) {

	var wrap = document.getElementById('wrap'),
		arr = snapshot || queue;
		renderItem = '';

	for (var i = 0, len = arr.length; i < len; ++i) {

		renderItem += '<div class="item" style="height:' + arr[i] * 2 + 'px;"></div>';
	}

	wrap.innerHTML = renderItem;
	
}

//绘制可视化动画
function paint() {

	var timer = setInterval(function() {

		if (snapshot.length != 0) {

			render(snapshot.shift());

		} else {

			clearInterval(timer);
		}	

	}, INTERVAL);			
}
