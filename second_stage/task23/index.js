
//存储队列
var queue = [],
  timer = null;

var treeRoot = $('root');

//事件兼容处理
var EventUtil = {

	addHandler : function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, handler, false);
		} else {
			element['on' + type] = handler;
		}
	},
	removeHandler : function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + type, handler, false);
		} else {
			element['on' + type] = null;
		}
	}
}

window.onload = function () {

	var bfc = $('bfc'),
        dfs = $('dfs');

    EventUtil.addHandler(preBtn, 'click', function() {
    	reset()
    	preOrder(treeRoot);
    	render();
    });
    EventUtil.addHandler(inBtn, 'click', function() {
    	reset()
    	inOrder(treeRoot);
    	render();
    });
    EventUtil.addHandler(postBtn, 'click', function() {
    	reset()
    	postOrder(treeRoot);
    	render();
    });
}


//获取函数
function $(id) {

	if (document.getElementById) {
		return document.getElementById(id);
	}
}

/* 广度优先遍历（BFC）*/

//定义存储队列
var queue1 = [],
	queue2 = [];

function BFC(node) {

	if (node) {

		queue1.push(node);
	}

	while (queue1.length) {
		
		queue1.shift(node);
		queue2.push(node);

		if (node.childNode.length) {

			for (var i = 0, len = node.childNode.length; i < len; ++i) {

				queue1.push(node.childNode[i]);
			}
		}
	}
}

/* 深度优先遍历（DFS） */
function DFS(node) {

	if (node) {

		queue1.push(node);
	}

	for (var i = 0, len = node.childNode.length; i < len; ++i) {

		queue1.push(node.childNode[i]);
	}

	while (queue1.length) {

		queue1.pop();
		queue1.push(node);

		if (node.childNode.length) {

			queue1.push(queue1.childNode[1]);
		}
	}
}


//渲染函数
function render(node) {

	var i = 0;

	queue[i].style.backgroundColor = 'blue';

	timer = setInterval(function() {

		i++;

		if (i < queue.length) {

			queue[i-1].style.backgroundColor = '#fff';
			queue[i].style.backgroundColor = 'blue';

		} else {

			clearInterval(timer);
			queue[queue.length-1].style.backgroundColor = '#fff';
		}

	}, 500);
}

//重置函数
function reset() {

	queue = [];
	
	clearInterval(timer);

	var divLists = document.getElementsByTagName('div');

	for (var i = 0; i < divLists.length; i++) {

		divLists[i].style.backgroundColor = '#fff';
	}

}