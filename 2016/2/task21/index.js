//数据队列
var queue = []; 

var button = $('button'),
     entry = $('entry');

/* 简化操作 */
function $(id) {

	if (document.getElementById) {

		return document.getElementById(id);
	}
}

/* 构造函数封装 */
function EventHandler(tar, type, wrap) {

	this.tar = tar;
	this.type = type;
}

EventHandler.prototype = {

	constructor : EventHandler,

	addItem : function() {

		if (this.type == 'keyup') {

			this.tar.addEventListener(this.type, function(event) {
				
				var keyCode = event.keyCode;

				if (keyCode == 13 || keyCode == 32 || keyCode == 188 ) {
					
					var queueItem = this.value.trim();
					
					if (queueItem != '' && queue.indexOf(queueItem) == -1) {

						if (queue.length >= 10) {

							queue.shift();	
						}

						queue.push(queueItem);
					}
				}

				render('wrap1');
			});
		}
		if (this.type == 'click') {
		
			this.tar.addEventListener(this.type, function(event) {

				var interest = $('interest'),
					wrap1 = $();

				if (queueItem != '') {
				
					var queueItem = interest.value.trim().split(/[,，\s]/g);

					var queueFilter = [],
						       json = {}; 


					for (var i = 0, len = queueItem.length; i < len; ++i) {

						if(!json[queueItem[i]]) {

							queueFilter.push(queueItem[i]);
							json[queueItem[i]] = 1;
						}
					}

					var queueFilter = queueFilter.filter(function(item) {

						return queue.indexOf(item) == -1 && item != '';

					});

					var flag = queue.length + queueFilter.length;

					if (queue.length && flag > 10) {

						for (var i = 0, len = flag - 10; i < len; ++i) {

							queue.shift();
						}

						queue = queue.concat(queueFilter);

					} else if (!queue.length) {

						for (var i = 0, len = queueFilter.length - 10; i < len; ++i) {

							queueFilter.shift();
						}

						queue = queue = queue.concat(queueFilter);

					} else {

						queue = queue.concat(queueFilter);
						
					}
				}
				
				render('wrap2');
			});
		}
	},
	delItem : function(wrapType) {

		var wrap = $(wrapType);

		wrap.addEventListener('mouseover', function(event) {

			if (event.target.className == 'item') {

				var target = event.target;

				var child = document.createElement('div');

				child.className = 'del';
				child.innerHTML = '点击删除' + target.innerHTML;

				target.parentNode.insertBefore(child, target);
			}
		});

		wrap.addEventListener('mouseout', function(event) {

			if (event.target.className == 'del') {

				var target = event.target;

				target.parentNode.removeChild(target);
			}

		});

		wrap.addEventListener('click', function(event) {

			if (event.target.className == 'del') {

				var target = event.target;

				queue.splice(queue.indexOf(target.innerHTML), 1);

				target.parentNode.removeChild(event.target.nextSibling);
				target.parentNode.removeChild(target);
			}
		});
	}
};

function render(wrapType) {

	var wrap = $(wrapType),
           renderItem = '';

	for (var i = 0, len = queue.length; i < len; ++i) {

		renderItem += '<div class="item">'+ queue[i] + '</div>';
	}
	
	wrap.innerHTML = renderItem;
}

var demo1 = new EventHandler(entry, 'keyup'),
    demo2 = new EventHandler(button, 'click');

demo1.addItem();
demo2.addItem();

demo1.delItem('wrap1');
demo2.delItem('wrap2');