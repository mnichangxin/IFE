window.onload = function() {

	var btn = document.getElementById('button');

	btn.addEventListener('click', btnHandler, false);

}

function btnHandler() {

	var field = document.getElementById('field'),
		info  = document.getElementById('info');

	if (!/^[\w\u4e00-\u9fa5]{4,16}$/.test(field.value)) {

		info.innerHTML = '字符数必须为4~16位';
		info.style.color = '#be515c';
		field.style.borderColor = '#be515c';

	}else {

		info.innerHTML = '名称格式正确';
		info.style.color = '#439b23';
		field.style.borderColor = '#439b23';
	}

	
}