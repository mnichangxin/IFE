/* 数据格式演示
var aqiSourceData = {
    "北京": {
        "2016-01-01": 10,
        "2016-01-02": 10,
        "2016-01-03": 10,
        "2016-01-04": 10
    }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {

    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;

    return y + '-' + m + '-' + d;  
}

function randomBuildData(seed) {

    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';

    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }

    return returnData;
}

//源数据
var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: 'day'
}

/**
 * 渲染图表
 */
function renderChart() {

    var chartWrap = document.getElementById('aqi-chart-wrap'); 
    var chart = '',
        color = '';

    for (var renderData in chartData) {

        color = chartColor(chartData[renderData]);
        chart += '<div class="chart" title="' + renderData + '" style="width:10px;height:'+ chartData[renderData] + 'px;background:' + color + ';display:inline-block;margin-left:10px">' + '</div>';
    }

    chartWrap.innerHTML = chart;
}

function chartColor(value) {

    if (value <= 100) {
        return "#2A9B19";
    } else if (value <= 200) {
        return "#0b0cff";
    } else if (value <= 300) {
        return "#dd150c";
    } else if (value <= 400) {
        return "#790996";
    } else {
        return "black";
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {

    pageState.nowGraTime = event.target.value;

    initAqiChartData();
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {

    pageState.nowSelectCity = event.target.value;

    initAqiChartData();
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

    var graTime = document.getElementById('form-gra-time');

    graTime.addEventListener('change', graTimeChange); //事件代理
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {

    var city = document.getElementById('city-select');

    city.addEventListener('change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
*/
function initAqiChartData() {

    var nowChartData;

    nowChartData = aqiSourceData[pageState.nowSelectCity];

    if (pageState.nowGraTime == 'day') {

        chartData = nowChartData;

    }
    if (pageState.nowGraTime == 'week') {
        
        chartData = {};

        var dataCount = 0, //数据累加器
            weekCount = 0, //周数累加器
            dayCount  = 0; //天数累加器

        for (var timeItem in nowChartData) {

            dataCount += nowChartData[timeItem];

            dayCount++;

            if (new Date(timeItem).getDay() == 6) {

                weekCount++;
                chartData['第' + weekCount + '周'] = Math.floor(dataCount/dayCount);

                dataCount = 0;
                dayCount  = 0;
            }  
        }    

        //如果最后一天不是周六
        if (dayCount != 0) {

            weekCount++;
            chartData['第' + weekCount + '周'] = Math.floor(dataCount/dayCount);
        }    

    }
    if (pageState.nowGraTime == 'month') {

        chartData = {};

        var dataCount  = 0, //数据累加器
            monthCount = 0, //月数累加器
            dayCount   = 0; //天数累加器

        for (var timeItem in nowChartData) {

            var monthDate = new Date(timeItem);
            var str = monthDate.setDate(monthDate.getDate() + 1);
           
            dataCount += nowChartData[timeItem];

            dayCount++;

            if (monthDate.getDate() == 1) {

                monthCount++;

                chartData['第' + monthCount + '月'] = Math.floor(dataCount/dayCount); //需要减去每个月的一号

                dataCount = 0;                                                                                                                                                                                                                                                                                                                                                                              
                dayCount = 0;
            }
        }
    }

}

/**
 * 初始化函数
 */
function init() {

    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();