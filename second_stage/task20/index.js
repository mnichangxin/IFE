//数据队列
var queue = []; 


//匹配队列
var queryList = [];

window.onload = function() {

	var inOut = document.getElementById('in-out');
	var wrap = document.getElementById('wrap');
	var query = document.getElementById('query');

	//按钮点击触发的事件
	inOut.addEventListener('click', buttonHandler);

	//队列项点击触发的事件
	wrap.addEventListener('click', itemHandler);

	//查询事件
	query.addEventListener('click',queryHandler);

}

//按钮事件
function buttonHandler(event) { 

	var str = document.getElementById('area').value;

	if (event.target.tagName.toLowerCase() == 'button' && str !== '' && queue.length <= 60) {

		if (event.target.id == 'left-in') {	 
			strHandler(str,event.target.id);
		}

		if (event.target.id == 'right-in') {
			strHandler(str,event.target.id);
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

//查询事件
function queryHandler(event) {

	var queryData = document.getElementById('content').value;

	var pattern =  new RegExp(queryData);

	queryList = [];

	for (var i = 0, len = queue.length; i < len; ++i) {

		if (pattern.exec(queue[i])) {

			queryList.push(i);
		}	
	}

	render();

	flagRender();
}

//字符串处理
function strHandler(str,flag) {

	if(flag == 'left-in')
		queue = (str.split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g)).concat(queue);	
	if(flag == 'right-in')
		queue = queue.concat(str.split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g));
}

//队列渲染
function render(snapshot) {

	var wrap = document.getElementById('wrap'),
		arr = snapshot || queue,
		renderItem = '';

	for (var i = 0, len = arr.length;i < len; ++i) {

		renderItem += '<div class="item">'+ arr[i] + '</div>';
	}

	wrap.innerHTML = renderItem;
}

//标识渲染
function flagRender() {
	
	var queryData = document.getElementById('content').value,
	          item = document.getElementsByClassName('item'),
		              wrap = document.getElementById('wrap'),
				                             renderItem = '';

	for (var i = 0, len = queryList.length; i < len; ++i) {

		for (var j = 0, len = item.length; j < len; ++j) {

			if (queryList[i] == j) {
				
				item[j].innerHTML = item[j].innerHTML.replace(new RegExp(queryData, 'g'), '<span class="queryRender">' + queryData + '</span>');
			}
		}
	}
}

