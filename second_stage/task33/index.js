var flag = 'top'; //记录方块方向

window.onload = function() {
	var btn = document.getElementById('button');

	btn.addEventListener('click', handler, false);
}

function handler() {
	var content = document.getElementById('content').value.trim(),
	                     block = document.getElementById('block');

	var top = block.style.top,
	left = block.style.right;
	
	switch(content) {
		case 'GO':
			if (flag == 'top' && top != 0) {
				block.style.top = top - 50 + 'px';
			}
			if (flag == 'bottom' && top != 450) {
				block.style.top = top + 50 + 'px';
			}
			if (flag == 'left' && left != 0) {
				block.style.left = left - 50 + 'px';
			}
			if (flag == 'right' && left != 450) {
				block.style.left = left + 50 + 'px';
			}
			break;
		case 'TUN LEF':
			break;
		case 'TUN RIG':
			break;
		case 'BAC':
			break;
	}
}

