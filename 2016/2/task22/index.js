
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

	var preBtn = $('pre'),
          inBtn = $('in'),
      postBtn = $('post');

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

//前序遍历
function preOrder(node) {
	
	if (!(node == null)) {

		queue.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}

//中序遍历
function inOrder(node) {

	if (!(node == null)) {

		inOrder(node.firstElementChild);
		queue.push(node);
		inOrder(node.lastElementChild);
	}
}

//后序遍历
function postOrder(node) {

	if (!(node == null)) {

		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		queue.push(node);
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