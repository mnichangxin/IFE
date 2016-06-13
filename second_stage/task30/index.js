var queue = [];

window.onload = function() {

	var field = document.getElementsByClassName('field'),
	      btn = document.getElementById('button');

	for (var i = 0, len = field.length; i < len; ++i) {

		field[i].addEventListener('focus', focusHandler, false);
		field[i].addEventListener('blur', blurHandler, false);
	}      

	btn.addEventListener('click', btnHandler, false);

}

function focusHandler() {

	switch(this.id) {

		case 'name':
			infoHandler.apply(this, ['必填，长度为4~16个字符', '#ccc', false]);
			break;
		case 'password':
			infoHandler.apply(this, ['必填,格式正确即可', '#ccc', false]);
			break;
		case 'confirm':
			infoHandler.apply(this, ['确认密码', '#ccc', false]);
			break;
		case 'email':
			infoHandler.apply(this, ['输入邮箱', '#ccc', false]);
			break;
		case 'phone':
			infoHandler.apply(this, ['输入11位手机号', '#ccc', false]);
			break;	
	}	
}

function blurHandler() {

	this.parentNode.parentNode.lastElementChild.innerHTML = '';

	switch(this.id) {

		case 'name':
			if (this.value == '') {
				infoHandler.apply(this, ['名称不能为空', '#dc4b4b', false]);	
			} else if(!/^[\w\u4e00-\u9fa5]{4,16}$/.test(this.value)) {
				infoHandler.apply(this, ['长度为4~16个字符', '#dc4b4b', false]);
			} else {
				infoHandler.apply(this, ['名称可用', '#2ab924', true]);
			}
			break;
		case 'password':
			var cfm = document.getElementById('confirm');

			if (this.value != '' && (cfm.value == '' || this.value == cfm.value)) {
				infoHandler.apply(this, ['密码可用', '#2ab924', true]);
			} else if (this.value != cfm.value && cfm.value != '') {
				infoHandler.apply(this, ['两次密码不一致', '#dc4b4b', false]);
			}else {
				infoHandler.apply(this, ['请输入正确密码', '#dc4b4b', false]);
			}
			break;
		case 'confirm':
			var pwd = document.getElementById('password');

			if (this.value != '' && this.value == pwd.value) {
				infoHandler.apply(this, ['密码输入一致', '#2ab924', true]);
			}else {
				infoHandler.apply(this, ['两次密码不一致', '#dc4b4b', false]);
			}
			break;
		case 'email':
			if (/^[a-zA-Z0-9]\w+@[a-zA-Z0-9]+.com$/.test(this.value)) {
				infoHandler.apply(this, ['邮箱输入正确', '#2ab924', true]);
			}else {
				infoHandler.apply(this, ['邮箱格式不正确', '#dc4b4b', false]);
			}
			break;
		case 'phone':
			if (/^1((3[0-9])|(4[57])|(5[0-9])|(7[0678])|(8[0-9]))\d{8}$/.test(this.value)) {
				infoHandler.apply(this, ['手机号格式正确', '#2ab924', true]);
			}else {
				infoHandler.apply(this, ['手机号格式不正确', '#dc4b4b', false]);
			}
			break;	
	}
} 

function infoHandler(content, color, flag) {

 	this.parentNode.parentNode.lastElementChild.innerHTML = content;
 	this.parentNode.parentNode.lastElementChild.style.color = color;
	this.style.borderColor = color;	

	if (flag) {

		if(queue.indexOf(this.id) == -1){

			queue.push(this.id);
		}
	} else {

		if (queue.indexOf(this.id) != -1) {

			queue.splice(queue.indexOf(this.id), 1);
		}
	}
}

function btnHandler() {

	if (queue.length == 5) {
		alert('提交成功！');
	}else {
		alert('提交失败！');
	}
}