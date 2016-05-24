var queue = []; //定义队列

window.onload = function() {

	var buttonWrap = document.getElementById('button-wrap');
	var wrap = document.getElementById('wrap'); 

	//按钮点击触发的事件
	buttonWrap.addEventListener('click', buttonHandler);

	//队列项点击触发的事件
	wrap.addEventListener('click', itemHandler);
}

//按钮事件
function buttonHandler(event) {

	var item = document.getElementById('item');

	if (event.target.tagName.toLowerCase() == 'button' && (/^[0-9]+$/).test(item.value)) {

		if (event.target.id == 'left-in') {	 
			queue.unshift(item.value);
		} else if (event.target.id == 'right-in') {
			queue.push(item.value);
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
function render() {

	var wrap = document.getElementById('wrap'),
		renderItem = '';

	for (var i = 0, len = queue.length;i < len; ++i) {

		renderItem += '<div class="item">'+ queue[i] +'</div>';
	}

	wrap.innerHTML = renderItem;
	
}