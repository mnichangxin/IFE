var obj = {

	'北京' : ['清华大学','北京大学', '北京航空航天大学', '北京邮电大学', '中国农业大学', '中国传媒大学' ],
	'天津' : ['天津大学', '天津理工大学', '南开大学', '河北工业大学'],
	'上海' : ['复旦大学', '同济大学', '上海交通大学', '华东师范大学', '上海大学', '上海财经大学'],
	'西安' : ['西安交通大学', '长安大学' , '西安电子科技大学', '西北农林科技大学'],
	'南京' : ['南京大学', '东南大学', '南京理工大学', '南京航空航天大学', '南京农业大学', '河海大学']
}

var queue = [];

window.onload = function() {

	var radio = document.getElementById('radio').getElementsByTagName('input'),
	 cityName = document.getElementById('city');

	radio[0].addEventListener('change', radioChange, false);
	radio[1].addEventListener('change', radioChange, false);
	cityName.addEventListener('change', selectChange, false);
}

function radioChange() {
	
	var noneStu = document.getElementById('none-stu'),
	             stu = document.getElementById('stu');
	            
	if (this.value == 'stu') {

		stu.style.display  = 'block';
		noneStu.style.display = 'none';
	} else {
		stu.style.display  = 'none';
		console.log(noneStu);
		noneStu.style.display = 'block';
	}
}

function selectChange() {

	for (city in obj) {

		if (this.value == city) {
			queue = obj[city];
		}
	}

	render();
}

function render() {

	var school = document.getElementById('school'),
		list = '';

	for (var i = 0, len = queue.length; i < len; ++i) {

		list += '<option>' + queue[i] + '</option>';
	}

	school.innerHTML = list;
}